import { Image, View } from "react-native";
import React from "react";
import { Images } from "../assets/images";

export const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Image
        source={Images.splashImage}
        style={{ width: 200, height: 200, borderRadius: 50 }}
      />
    </View>
  );
};
