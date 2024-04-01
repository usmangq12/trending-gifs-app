import { Image, View, ActivityIndicator } from "react-native";
import React from "react";
import { Images } from "../assets/images";

export const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
