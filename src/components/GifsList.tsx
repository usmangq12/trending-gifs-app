import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { GIF } from "../types";
import ShimmmerPlaceholer from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

interface GifItemProps {
  gif: GIF;
  onSelectGifDetail: (item: GIF) => void;
}

const GifItem: React.FC<GifItemProps> = ({ gif, onSelectGifDetail }) => {
  const [loading, setLoading] = useState(true);
  const [showProgressbar, setShowProgressbar] = useState(false);
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setShowProgressbar(true);
  };

  return (
    <Pressable
      style={styles.buttonStyle}
      onPress={() => {
        onSelectGifDetail(gif);
      }}
    >
      {loading && (
        <ShimmmerPlaceholer
          LinearGradient={LinearGradient}
          location={null}
          shimmerStyle={[styles.shimmer,{height: 100}]}
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
  onSelectGifDetail: (item: GIF) => void;
  handleEndReached: () => void;
  isFetching: boolean;
  handleRefreshRequest:()=>void;
}

export const GifsList: React.FC<GifsListProps> = ({
  Gifs,
  onSelectGifDetail,
  handleEndReached,
  isFetching,
  handleRefreshRequest
}) => {
  const [isRefresh,setIsRefresh] = useState(false);
  const Footer = () => {
    {
      return isFetching ? (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null;
    }
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    handleRefreshRequest();
    setIsRefresh(false);
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={Gifs.map((item, index) => ({
          ...item,
          id: `${item.id}-${index.toString()}`,
        }))}
        keyExtractor={(item) => item.id}
        // getItemLayout={getItemLayout}
        numColumns={2}
        refreshing={isRefresh}
        onRefresh = {handleRefresh}
        style={styles.list}
        initialNumToRender={14}
        columnWrapperStyle={{ gap: 6 }} // Increased gap between items
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => {
          return <GifItem gif={item} onSelectGifDetail={onSelectGifDetail} />;
        }}
        onEndReached={handleEndReached}
        ListFooterComponent={Footer}
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
    position: "relative",
  },
  loadingIndicator: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b8b8b8",
    maxHeight: 50,
    padding: 6,
  },
  footer: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
    backgroundColor: "transparent",
  },
  shimmer : {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    
  }
});
