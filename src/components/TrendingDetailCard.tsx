import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rating } from "./Rating";

type Props = {
  date: Date;
};

export const TrendingDetailCard: React.FC<Props> = ({ date }) => {
  const getFormattedDate = () => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>Trending Date</Text>
        <Text style={styles.dateText}>{getFormattedDate()}</Text>
      </View>
      <View style={{ marginLeft: 3 }}>
        <Rating />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 15,
    gap: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  dateText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
