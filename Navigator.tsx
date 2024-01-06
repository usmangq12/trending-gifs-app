import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { MainScreen } from "./src/screens/MainScreen";
import { BottomMenuBar } from "./src/components/BottomMenuBar";
import { SearchedGifsScreen } from "./src/screens/SearchedGifsScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

const routes = [
  {
    name: "main",
    headerTitle: "",
    screen: MainScreen,
    options: {
      headerShown: false,
      headerTitle: "",
    },
  },
  {
    name: "search",
    headerTitle: "",
    screen: SearchedGifsScreen,
    options: {},
  },
  {
    name: "settings",
    headerTitle: "",
    screen: SettingsScreen,
    options: {},
  },
];

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0F0F0F" barStyle={"default"} />
      <Stack.Navigator initialRouteName="splash">
        {routes?.map((data, index) => (
          <Stack.Screen
            key={data.name}
            name={data.name}
            component={data.screen}
            options={data.options}
          />
        ))}
      </Stack.Navigator>
      <BottomMenuBar />
    </NavigationContainer>
  );
};
