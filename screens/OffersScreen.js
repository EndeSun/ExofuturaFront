import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});