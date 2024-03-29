import React from "react";
import { StyleSheet, Image, Pressable, View } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { GIF } from "../types";

interface GifItemProps {
  gif: GIF;
  onSelectGifDetail: (item: GIF) => void;
}

const GifItem: React.FC<GifItemProps> = ({ gif, onSelectGifDetail }) => {
  return (
    <Pressable
      style={styles.buttonStyle}
      onPress={() => {
        onSelectGifDetail(gif);
      }}
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
  onSelectGifDetail: (item: GIF) => void;
  handleEndReached: () => void;
}

export const GifsList: React.FC<GifsListProps> = ({
  Gifs,
  onSelectGifDetail,
  handleEndReached,
}) => {
  return (
    <View style={styles.listContainer}>
      <MasonryList
        data={Gifs.map((item, index) => ({
          ...item,
          id: `${item.id}-${index.toString()}`,
        }))}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => {
          return <GifItem gif={item} onSelectGifDetail={onSelectGifDetail} />;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  list: { gap: 6, borderRadius: 12 },
  buttonStyle: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
});
