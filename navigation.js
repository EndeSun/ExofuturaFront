import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import OffersScreen from "./screens/OffersScreen";
import DetailScreen from "./screens/DetailScreen"; // Nueva pantalla
import Icon from "react-native-vector-icons/Ionicons"; // Asegúrate de usar el icono correcto de Ionicons
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "map"; // Asegúrate de usar el nombre correcto del icono de Ionicons
          } else if (route.name === "Offers") {
            iconName = "pricetag"; // Asegúrate de usar el nombre correcto del icono de Ionicons
          } else if (route.name === "Settings") {
            iconName = "settings"; // Asegúrate de usar el nombre correcto del icono de Ionicons
          }
          // Asegúrate de que el icono se renderiza correctamente
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
