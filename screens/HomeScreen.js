import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { fetchZones } from "./services/zones";
import { fetchLocation } from "./services/location";
import MapComponent from "./components/MapComponent";
import styles from './style/styles';

export default function HomeScreen() {
  // #region STATES
  // ZONE STATE
  const [zoneData, setZoneData] = useState(null);
  const [zoneLoading, setZoneLoading] = useState(true);
  const [zoneError, setZoneError] = useState(null);

  // LOCATION STATE
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  // #endregion STATES

  // #region FETCHING
  useEffect(() => {
    const initializedData = async () => {
      try {
        const zones = await fetchZones();
        setZoneData(zones);
        setZoneLoading(false);
      } catch (error) {
        setZoneError("Error al obtener los datos");
        setZoneLoading(false);
      }
    };

    const fetchUserLocation = async () => {
      try {
        const location = await fetchLocation();
        setLocation(location);
      } catch (error) {
        setLocationError(error.message);
      }
    };

    fetchUserLocation();
    initializedData();
  }, []);
  // #endregion FETCHING

  // #region LOADING AND ERROR HANDLING
  let text = "Waiting...";

  if (zoneLoading) {
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }

  if (locationError) {
    text = locationError;
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  } else if (location) {
    text = JSON.stringify(location);
  }
  // #endregion

  // #region RENDER MAP
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {location ? (
          <MapComponent location={location} zoneData={zoneData} />
        ) : (
          <Text>Cargando mapa...</Text>
        )}
      </View>
    </View>
  );
  // #endregion
}
