import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { GIF } from "../types";

const profileUri = "https://media1.giphy.com/avatars/afvpets/BVRmjCq0Ig7M.jpg";
type Props = {
  gifDetail: GIF;
  category: string;
};

export const CreatorInfoCard: React.FC<Props> = ({ gifDetail, category }) => {
  const uri = gifDetail?.user?.avatar_url
    ? gifDetail?.user?.avatar_url
    : profileUri;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={48}
          source={{
            uri: uri,
          }}
        />
        <View>
          <View>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{gifDetail?.user?.display_name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "50%",
  },
  nameText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 20,
  },
  categoryText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 20,
  },
  dateContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateText: { fontSize: 15, fontWeight: "600" },
});
