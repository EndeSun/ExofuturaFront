import * as Location from "expo-location";
import { Platform } from "react-native";

export const fetchLocation = async () => {
  if (Platform.OS === "android" && !Device.isDevice) {
    throw new Error(
      "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
    );
  }

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
};
