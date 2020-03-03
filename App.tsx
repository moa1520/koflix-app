import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Movie from "./screens/Movie";
import TV from "./screens/TV";
import Search from "./screens/Search";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movie"
        tabBarOptions={{
          activeTintColor: "white",
          inactiveBackgroundColor: "rgba(20,20,20,1)",
          activeBackgroundColor: "rgba(20,20,20,1)",
          style: { backgroundColor: "rgba(20,20,20,1)" }
        }}
      >
        <Tab.Screen name="Movie" component={Movie} />
        <Tab.Screen name="TV" component={TV} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
