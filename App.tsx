import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Movie from "./screens/Movie";
import TV from "./screens/TV";
import Search from "./screens/Search";
import { BACKGROUND_COLOR } from "./styles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = (initialRoute: any, customConfig: any) => (
  <Stack.Navigator>
    <Stack.Screen
      name="InitialRoute"
      component={initialRoute}
      options={{ ...customConfig }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movie"
        tabBarOptions={{
          activeTintColor: "white",
          inactiveBackgroundColor: "black",
          activeBackgroundColor: "black",
          style: {
            backgroundColor: "black",
            borderTopColor: "transparent"
          }
        }}
      >
        <Tab.Screen name="영화">
          {() =>
            stackFactory(Movie, {
              headerTitle: "KOFLIX",
              headerTintColor: "red",
              headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
              headerStyle: {
                backgroundColor: BACKGROUND_COLOR,
                shadowColor: "transparent"
              }
            })
          }
        </Tab.Screen>
        <Tab.Screen name="TV">
          {() =>
            stackFactory(TV, {
              headerTitle: "KOFLIX",
              headerTintColor: "red",
              headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
              headerStyle: {
                backgroundColor: BACKGROUND_COLOR,
                shadowColor: "transparent"
              }
            })
          }
        </Tab.Screen>
        <Tab.Screen name="검색" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
