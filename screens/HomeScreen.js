import React, { useEffect, useState } from "react";
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
      console.log("You've entered region:", region);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  }
);

const regions = [
  {
    identifier: "Region1",
    latitude: 41.65,
    longitude: -0.90,
    radius: 100,
  },
  {
    identifier: "Region2",
    latitude: 38.35,
    longitude: -0.49,
    radius: 100,
  },
];

const startGeofencing = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== "granted") {
    console.error("Permission to access location was denied");
    return;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
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
        const [zones, location] = await Promise.all([fetchZones(), fetchLocation()]);
        setZoneData(zones);
        setLocation(location);
      } catch (error) {
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    startGeofencing();
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
