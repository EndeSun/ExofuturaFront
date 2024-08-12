import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchZones } from "./services/zones";
import { fetchLocation } from "./services/location";
import MapComponent from "./components/MapComponent";
import styles from "./style/styles";

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
