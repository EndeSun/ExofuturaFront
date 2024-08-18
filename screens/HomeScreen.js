import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchZones } from "./services/zones";
import { fetchLocation } from "./services/location";
import { fetchUnlockedZones } from "./services/fetchUnlockedZones";
import putDiscoverZone from './services/putDiscoverZone';

import MapComponent from "./components/MapComponent";
import styles from "./style/styles";
import * as Location from "expo-location";
import ErrorMessage from './components/ErrorMessage';
import {startGeofencing} from './services/geofencingService';

export default function HomeScreen() {
  // #region STATES
  const [zoneData, setZoneData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // #endregion STATES

  // #region FETCHING
  var idUser = 3; // Hardcoded for now, should be dynamic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [zones, location, unlockedZones] = await Promise.all([
          fetchZones(),
          fetchLocation(),
          fetchUnlockedZones(idUser),
        ]);

        console.log(zones);
        console.log(location);
        console.log(unlockedZones);

        
        const formattedZones = zones.map((zone) => ({
          identifier: String(zone.id), // Use id as identifier
          latitude: parseFloat(zone.latitude),
          longitude: parseFloat(zone.longitude),
          radius: parseFloat(zone.radius), // Convert radius to meters if necessary
        }));

        setZoneData(unlockedZones);
        setLocation(location);

        // #region GEOFENCING
        await startGeofencing(formattedZones);
        // #endregion GEOFENCING

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
  }, [idUser]);
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
