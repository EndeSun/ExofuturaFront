import React from "react";
import MapView from "react-native-maps";
import MarkersComponent from "./MarkersComponent";
import styles from "../style/styles";

export default function MapComponent({ location, zoneData }) {
  return (
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
      <MarkersComponent zoneData={zoneData} />
    </MapView>
  );
}
