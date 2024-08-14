import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, Text } from "react-native";
import { fetchZones } from "./services/zones";
import { fetchLocation } from "./services/location";
import MapComponent from "./components/MapComponent";
import styles from "./style/styles";
import { GeofencingEventType } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const GEOFENCING_TASK = "GEOFENCING_TASK";

TaskManager.defineTask(
  GEOFENCING_TASK,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      console.error(error.message);
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      Alert.alert(
        "Geofencing Alert",
        `You've entered region: ${region.identifier}`
      );
    } else if (eventType === GeofencingEventType.Exit) {
      Alert.alert(
        "Geofencing Alert",
        `You've left region: ${region.identifier}`
      );
    }
  }
);

const startGeofencing = async (regions) => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== "granted") {
    console.error("Permission to access location was denied");
    return;
  }

  const { status: backgroundStatus } =
    await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== "granted") {
    console.error("Permission to access location in the background was denied");
    return;
  }

  try {
    await Location.startGeofencingAsync(GEOFENCING_TASK, regions);
    console.log("Geofencing started");
  } catch (error) {
    console.error(error);
  }
};

const ErrorMessage = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default function HomeScreen() {
  // #region STATES
  const [zoneData, setZoneData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // #endregion STATES

  // #region FETCHING
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zones, location] = await Promise.all([
          fetchZones(),
          fetchLocation(),
        ]);
        const formattedZones = zones.map((zone) => ({
          identifier: String(zone.id), // Use id as identifier
          latitude: parseFloat(zone.latitude),
          longitude: parseFloat(zone.longitude),
          radius: parseFloat(zone.radius), // Convert radius to meters if necessary
        }));
        setZoneData(zones);
        setLocation(location);
        await startGeofencing(formattedZones);

        // POSITION CHANGES
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 50, 
          },
          (newLocation) => {
            setLocation(newLocation);
          }
        );

        // Clean up the subscription on unmount
        return () => {
          locationSubscription.remove();
        };

      } catch (error) {
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // #endregion FETCHING

  // #region LOADING AND ERROR HANDLING
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  // #endregion LOADING AND ERROR HANDLING

  // #region RENDER MAP
  return (
    <View style={styles.container}>
      {location && zoneData ? (
        <MapComponent location={location} zoneData={zoneData} />
      ) : (
        <Text>Cargando mapa...</Text>
      )}
    </View>
  );
  // #endregion RENDER MAP
}
