import React from "react";
import { View, Text } from "react-native";
import styles from "./style/styles";


export default function DetailScreen({ route }) {
  const { zone } = route.params;
  // console.log("INFORMACIÓN DE LA ZONA:", zone);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Zone id: {zone.id}</Text>
    </View>
  );
}

