import React from "react";
import { View, Pressable, StyleSheet, Alert } from "react-native";
import { DownloadIcon } from "../assets/svgs/DownloadIcon";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

interface Props {
  url: string;
}

export const DownloadGif: React.FC<Props> = ({ url }) => {
  console.log("uri of downloaded video ",url,);
  async function downloadFile() {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please grant permission to access media library."
        );
        return;
      }

      const fileUri = FileSystem.documentDirectory + "video.mp4";
      const downloadResponse = await FileSystem.downloadAsync(url, fileUri);
      if (downloadResponse.status !== 200) {
        throw new Error("Failed to download the video.");
      }

      await MediaLibrary.saveToLibraryAsync(downloadResponse.uri);

      Alert.alert(
        "Download Complete",
      );
    } 
    catch (error) {
      Alert.alert("Download Error", "Failed to download the video.");
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={downloadFile}>
        <DownloadIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "black", padding: 10, borderRadius: 50 },
});
