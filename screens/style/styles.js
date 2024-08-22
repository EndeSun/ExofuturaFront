import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  }
});

export default styles; // Exportación por defecto