import React from "react";
import { Marker } from "react-native-maps";

export default function MarkersComponent({ zoneData }) {
  return (
    <>
      {zoneData.map((zone, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: zone.latitude,
            longitude: zone.longitude,
          }}
          title={zone.name}
          description={zone.description}
        />
      ))}
    </>
  );
}
