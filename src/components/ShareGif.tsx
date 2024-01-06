import React from "react";
import { ShareIcon } from "../assets/svgs/ShareIcon";
import { Pressable, View } from "react-native";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { GIF } from "../types";

// Props interface declaration for the ShareGif component
interface Props {
  gif: GIF; // Expecting a GIF object as a prop
}

export const ShareGif: React.FC<Props> = ({ gif }) => {
  // Constructing the URL of the GIF using the GIF's ID
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
    <Pressable onPress={handleShareGif}>
      <ShareIcon />
    </Pressable>
  );
};
