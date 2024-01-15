import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { DownloadIcon } from "../assets/svgs/DownloadIcon";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

interface props {
  url: string;
}

export const DownloadGif: React.FC<props> = ({ url }) => {
  async function downloadFile() {
    try {
      // Downloading the file
      let fileLocation = FileSystem.documentDirectory + "test.mp4";
      console.log("File Location", fileLocation);
      const downloadedFile = await FileSystem.downloadAsync(url, fileLocation);
      // Check if the download was successful
      if (downloadedFile && downloadedFile.uri) {
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        // Saving the file in a folder named `MyImages`
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        if (status === "granted") {
          FileSystem.getInfoAsync(downloadedFile.uri).then((res) => {
            console.log("res ", res);
            Camera.saveToCameraRoll(downloadedFile.uri, "photo");
          });
        }
      } else {
        console.error("Failed to download file.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => await downloadFile()}>
        <DownloadIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "black", padding: 10, borderRadius: 50 },
});
