import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
