import { GeofencingEventType } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";

const GEOFENCING_TASK = "GEOFENCING_TASK";

let initialRegions = [];
let enteredRegions = new Set();

TaskManager.defineTask(
  GEOFENCING_TASK,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      console.error(error.message);
      return;
    }

    // Check if the region is in the initial regions list
    const isInitialRegion = initialRegions.some(
      (r) => r.identifier === region.identifier
    );

    if (isInitialRegion) {
      // Remove the region from the initial regions list
      initialRegions = initialRegions.filter(
        (r) => r.identifier !== region.identifier
      );
      return;
    }

    if (eventType === GeofencingEventType.Enter) {
      // Check if we already entered this region to avoid duplicate alerts
      if (!enteredRegions.has(region.identifier)) {
        enteredRegions.add(region.identifier);
        Alert.alert(
          "Geofencing Alert",
          `You've entered region: ${region.identifier}`
        );
      }
    } else if (eventType === GeofencingEventType.Exit) {
      // Remove the region from the entered regions set
      if (enteredRegions.has(region.identifier)) {
        enteredRegions.delete(region.identifier);
        Alert.alert(
          "Geofencing Alert",
          `You've left region: ${region.identifier}`
        );
      }
    }
  }
);

export const startGeofencing = async (regions) => {
  // FOREGROUND PERMISSIONS
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();

  if (foregroundStatus !== "granted") {
    console.error("Permission to access location was denied");
    return;
  }

  // BACKGROUND PERMISSIONS
  const { status: backgroundStatus } =
    await Location.requestBackgroundPermissionsAsync();

  if (backgroundStatus !== "granted") {
    console.error("Permission to access location in the background was denied");
    return;
  }

  try {
    initialRegions = regions;
    await Location.startGeofencingAsync(GEOFENCING_TASK, regions);
    console.log("Geofencing started");
  } catch (error) {
    console.error(error);
  }
};
