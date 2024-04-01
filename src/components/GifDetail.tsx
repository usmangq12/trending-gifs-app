import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { GIF } from "../types";
import { CreatorInfoCard } from "./CreatorInfoCard";
import { TrendingDetailCard } from "./TrendingDetailCard";
import { ShareGif } from "./ShareGif";
import { DownloadGif } from "./DownloadGif";

interface Props {
  gif: GIF;
  onBack: (item: GIF | null) => void;
  category: string;
}

export const GifDetail: React.FC<Props> = ({ gif, onBack, category }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Pressable onPress={() => onBack(null)}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headingText}>Gif</Text>
      </View>
      <View>
        {gif?.user && (
          <View>
            <CreatorInfoCard gifDetail={gif} category={category} />
          </View>
        )}
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imgStyle}
          source={{ uri: gif.images.fixed_height.webp }}
        />
      </View>
      <View>
        <Text style={styles.titleText}>{gif.title}</Text>
      </View>
      <View>
        <TrendingDetailCard date={gif.trending_datetime} />
      </View>
      <View style={styles.iconContainer}>
        <View>
          <ShareGif gif={gif} />
        </View>
        <View>
        <DownloadGif url={gif.images.fixed_height.mp4 as string} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 14,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    flex: 1,
    marginRight: 20,
    textAlign: "center",
    fontSize: 40,
    color: "black",
    fontWeight: "800",
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    fontWeight: "800",
  },
  imgStyle: { width: "100%", height: 400 },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  detailContainer: {
    borderRadius: 20,
  },
  backText: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 10,
    flexDirection: "row",
  },
});
