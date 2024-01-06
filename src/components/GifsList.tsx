import React from "react";
import { StyleSheet, Image, Pressable, View } from "react-native";
import { GIF } from "../types";
import MasonryList from "@react-native-seoul/masonry-list";

interface GifItemProps {
  gif: GIF;
}

const GifItem: React.FC<GifItemProps> = ({ gif }) => {
  return (
    <Pressable
      style={styles.buttonStyle}
    >
      <Image
        source={{ uri: gif.images.fixed_height.webp }}
        style={{ width: "100%", height: Number(gif.images.fixed_width.height) }}
      />
    </Pressable>
  );
};

interface GifsListProps {
  Gifs: GIF[];
}

export const GifsList: React.FC<GifsListProps> = ({
  Gifs,
}) => {
  return (
    <View style={styles.listContainer}>
      <MasonryList
        data={Gifs}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => {
          return <GifItem gif={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal:12,
  },
  list: { gap: 6, borderRadius: 12 },
  buttonStyle: { flex: 1, borderRadius: 4, overflow: "hidden",marginBottom:6 },
});
