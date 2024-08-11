import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function HomeScreen() {
  // MARK: STATES
  // ZONE STATE
  const [zoneData, setZoneData] = useState(null);
  const [zoneLoading, setZoneLoading] = useState(true);
  const [zoneError, setZoneError] = useState(null);

  // LOCATION STATE
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

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

    const fetchLocation = async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setLocationError(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    fetchLocation();
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
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (locationError) {
    return (
      <View style={styles.container}>
        <Text>{locationError}</Text>
      </View>
    );
  }
  // #endregion

  // #region RENDER MAP
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {location ? (
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
            showsUserLocation={true}
          >
            {createMarkers()}
          </MapView>
        ) : (
          <Text>Cargando mapa...</Text>
        )}
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
