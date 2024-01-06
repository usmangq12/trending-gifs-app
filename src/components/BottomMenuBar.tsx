import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SettingIcon } from "../assets/svgs/SettingsIcon";
import { HomeIcon } from "../assets/svgs/HomeIcon";
import { SearchIcon } from "../assets/svgs/SearchIcon";

const routes = [
  {
    key: "main",
    title: "Main",
    focusedIcon: HomeIcon,
  },
  {
    key: "search",
    title: "Search",
    focusedIcon: SearchIcon,
  },
  {
    key: "settings",
    title: "Settings",
    focusedIcon: SettingIcon,
  },
];

export const BottomMenuBar = () => {
  const [index, setIndex] = useState(0);

  const navigation = useNavigation();

  const renderScene = BottomNavigation.SceneMap({
    main: () => null,
    search: () => null,
    settings: () => null,
  });

  const handleTabPress = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.bottomNavWrapper}>
      <BottomNavigation
        barStyle={styles.barstyle}
        style={styles.bottomNav}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        onTabPress={({ route }) => {
          handleTabPress(route.key);
        }}
        activeColor="black"
        inactiveColor="#AAA"
        theme={{
          colors: {
            secondaryContainer: "white",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavWrapper: {
    height: 78,
    backgroundColor: "#0F0F0F",
  },
  bottomNav: {
    marginBottom: 10,
  },
  barstyle: {
    backgroundColor: "white",
    
    justifyContent: "center",
  },
});
