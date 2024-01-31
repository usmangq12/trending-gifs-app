import React from "react";
import { ShareIcon } from "../assets/svgs/ShareIcon";
import { Pressable, View, StyleSheet } from "react-native";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { GIF } from "../types";

interface Props {
  gif: GIF;
}

export const ShareGif: React.FC<Props> = ({ gif }) => {
  const gifUrl = `https://media1.giphy.com/media/${gif.id}/200.gif`;

  const handleShareGif = async () => {
    try {
      const asset = Asset.fromURI(gifUrl);
      await asset.downloadAsync();

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(asset.localUri || "");
      } else {
        console.warn("Sharing is not available on this platform");
      }
    } catch (error) {
      console.error("Error sharing GIF:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleShareGif}>
        <ShareIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "black", padding: 10, borderRadius: 50 },
});
