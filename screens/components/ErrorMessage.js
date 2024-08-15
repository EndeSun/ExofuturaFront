import React from "react";
import { View, Text } from "react-native";
import styles from "../style/styles"; // Ajusta la ruta según tu estructura de carpetas

const ErrorMessage = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default ErrorMessage;
