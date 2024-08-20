import React from "react";
import { Marker } from "react-native-maps";
import {useNavigation} from '@react-navigation/native';

export default function MarkersComponent({ zoneData }) {
  const navigation = useNavigation();
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
          onPress={() => navigation.navigate('Detail', {zone})}
        />
      ))}
    </>
  );
}
