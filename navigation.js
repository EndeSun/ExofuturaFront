import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import OffersScreen from "./screens/OffersScreen";
import Icon from "react-native-vector-icons/Ionicons"; // Asegúrate de usar el icono correcto de Ionicons

const Tab = createBottomTabNavigator();

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
          }
          // Asegúrate de que el icono se renderiza correctamente
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
