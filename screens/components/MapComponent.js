import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import MapView from "react-native-maps";
import MarkersComponent from "./MarkersComponent";
import styles from "../style/styles";

export default function MapComponent({ location, zoneData }) {
  const mapRef = useRef(null);
  
  const latitudeDelta = 0.02;
  const longitudeDelta = 0.02;

  const centerMap = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
        1000
      );
    }
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        style={styles.map}
        showsUserLocation={true}
      >
        <MarkersComponent zoneData={zoneData} />
      </MapView>
      <FAB
        style={styles.fab}
        icon="crosshairs-gps"
        onPress={centerMap}
      />
    </View>
  );
}
