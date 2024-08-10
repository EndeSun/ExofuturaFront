import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function HomeScreen() {
  const [zoneData, setZoneData] = useState(null);
  const [zoneLoading, setZoneLoading] = useState(true);
  const [zoneError, setZoneError] = useState(null);

  // MARK: FETCH ZONE DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.20.10.12/exofutura/public/api/v1/zones"
        );
        setZoneData(response.data);
        setZoneLoading(false);
      } catch (error) {
        setZoneError("Error al obtener los datos");
        setZoneLoading(false);
      }
    };

    fetchData();
  }, []);

  //#region CREATE MARKERS
  const createMarkers = () => {
    if (!zoneData) return null;

    return zoneData.map((zone, index) => (
      <Marker
        key={index} 
        coordinate={{
          latitude: zone.latitude, 
          longitude: zone.longitude, 
        }}
        title={zone.name} 
        description={zone.description} 
      />
    ));
  };
  //#endregion CREATE MARKERS

  // #region LOADING AND ERROR HANDLING
  if (zoneLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando los datos...</Text>
      </View>
    );
  }

  if (zoneError) {
    return (
      <View style={styles.container}>
        <Text>{zoneError}</Text>
      </View>
    );
  }
  // #endregion

  // #region RENDER MAP
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 41.6477295, // Adjust initial region as needed
            longitude: -0.8770484,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {createMarkers()}
        </MapView>
      </View>
    </View>
  );
  // #endregion
}


// #region STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
// #endregion