import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Movie from "./screens/Movie";
import TV from "./screens/TV";
import Search from "./screens/Search";
import { BACKGROUND_COLOR } from "./styles";
import NavIcon from "./components/NavIcon";

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
          showLabel: false,
          showIcon: true,
          labelStyle: {
            fontWeight: "600",
            fontSize: 14
          },
          style: {
            backgroundColor: "black",
            borderTopColor: "transparent"
          }
        }}
      >
        <Tab.Screen
          name="영화"
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon name="ios-film" focused={focused} size={26} />
            )
          }}
        >
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
        <Tab.Screen
          name="TV"
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon name="ios-tv" focused={focused} size={26} />
            )
          }}
        >
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
        <Tab.Screen
          name="검색"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon name="ios-search" focused={focused} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
