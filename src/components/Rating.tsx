import React from "react";
import { View, StyleSheet } from "react-native";
import { RatingStar } from "../assets/svgs/RatingStar";

export const Rating = () => {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(<RatingStar key={i} />);
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },
});
