import React, { useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  ActivityIndicator,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import ShimmmerPlaceholer from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { GIF } from "../types";

interface GifItemProps {
  gif: GIF;
  onSelectGifDetail: (item: GIF, index: number) => void;
  index: number;
}

const GifItem: React.FC<GifItemProps> = ({ gif, onSelectGifDetail, index }) => {
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <Pressable
      style={styles.buttonStyle}
      onPress={() => {
        onSelectGifDetail(gif, index);
      }}
    >
      {loading && (
        <ShimmmerPlaceholer
          LinearGradient={LinearGradient}
          location={undefined}
          shimmerStyle={[styles.shimmer, { height: 100 }]}
          shimmerColors={["#B8B8B8", "#B0B0B0"]}
          duration={2000}
          isReversed={true}
        />
      )}
      <Image
        source={{ uri: gif.images.fixed_height.webp }}
        style={{ width: "100%", height: 100 }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </Pressable>
  );
};

interface GifsListProps {
  Gifs: GIF[];
  onSelectGifDetail: (item: GIF, index: number) => void;
  handleEndReached: () => void;
  isFetching: boolean;
  handleRefreshRequest: () => void;
  handleScroll: any;

  scrollPosition: any;
}

export const GifsList: React.FC<GifsListProps> = ({
  Gifs,
  onSelectGifDetail,
  handleEndReached,
  isFetching,
  handleRefreshRequest,
  handleScroll,
  scrollPosition,
}) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const initialScrollIndex = useMemo(() => {
    if (scrollPosition !== undefined) {
      return Math.floor(Math.round(scrollPosition ) / 100);
    }
    return undefined;
  }, [scrollPosition]);

  const Footer = () => {
    return isFetching ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    handleRefreshRequest();
    setIsRefresh(false);
  };

  const handleScrollEvent = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    handleScroll(event);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: 100,
    offset: 100 * index,
    index,
  });
  if (Gifs) {
    return (
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          onScroll={handleScrollEvent}
          data={Gifs.map((item, index) => ({
            ...item,
            id: `${item.id}-${index.toString()}`,
          }))}
          keyExtractor={(item) => item.id}
          numColumns={2}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          style={styles.list}
          initialNumToRender={14}
          columnWrapperStyle={{ gap: 6 }}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
          renderItem={({ item, index }: any) => {
            return (
              <GifItem
                gif={item}
                index={index}
                onSelectGifDetail={onSelectGifDetail}
              />
            );
          }}
          onEndReached={handleEndReached}
          ListFooterComponent={Footer}
          initialScrollIndex={initialScrollIndex}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  list: {
    gap: 6,
    borderRadius: 12,
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
    position: "relative",
  },
  footer: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
    backgroundColor: "transparent",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
