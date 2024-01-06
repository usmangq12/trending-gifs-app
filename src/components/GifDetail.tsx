import React, { useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-paper";
import { GIF } from "../types";

interface Props {
  gif: GIF;
  onCloseDetailView: (item: GIF | null) => void;
}


export const GifDetail: React.FC<Props> = ({ gif, onCloseDetailView }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Pressable
          onPress={() => onCloseDetailView(null)}
          style={styles.buttonStyle}
        >
          <Icon source="arrow-left" color="white" size={28} />
        </Pressable>
        <Text style={styles.titleText}>{gif.title}</Text>
      </View>
      <Image
        style={styles.imgStyle}
        source={{ uri: gif.images.fixed_height.webp }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    gap: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    justifyContent: "flex-start",
  },
  titleText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    marginLeft: 6,
  },
  imgStyle: { width: "100%", height: 400 },
  iconContainer: { flexDirection: "row", justifyContent: "center" },
  buttonStyle: { width: 30, height: 30 },
});
