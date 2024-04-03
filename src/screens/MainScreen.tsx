import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSerachGifsQuery } from "../store/api";
import { GifsList } from "../components/GifsList";
import { GIF } from "../types";
import { GifDetail } from "../components/GifDetail";
import CategoriesContainer from "../components/CategoriesContainer";
import { SplashScreen } from "../common/SplashScreen";
import { useDebounce } from "../hooks/useDebounce";
import { categories } from "../utils";

export const MainScreen = () => {
  const listRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [lastViewedIndex, setLastViewedIndex] = useState(null);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  let { debouncedValue } = useDebounce(selectedCategory, 500);
  const { data, isLoading, isFetching } = useSerachGifsQuery({
    query: debouncedValue,
    offset: currentPage * 14,
    limit: 14,
  });

  const [gifDetail, setGifDetail] = useState<GIF | null>(null);
  const [mergedData, setMergedData] = useState<GIF[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isFetching) {
      setDataLoading(true);
    } else {
      setDataLoading(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      setMergedData((prevData) => {
        return [...(prevData || []), ...data];
      });
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(0);
    setMergedData([]);
  }, [selectedCategory]);

  const handleEndReached = () => {
    if (!dataLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onSelectGifCategory = async (item: string) => {
    setCurrentPage(0);
    setMergedData([]);
    setSelectedCategory(item);
  };

  const handleRefreshRequest = () => {
    setCurrentPage(0);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  const handleBackButton = (currentPage: number) => {
    console.log("Current Page ", currentPage);
    setGifDetail(null);
    setCurrentPage(currentPage);
    console.log("Scroll Position ", scrollPosition);
    setIsNavigatingBack(true); // Set flag to true when navigating back
    setScrollPosition(scrollPosition); // Commented out to avoid setting scroll position here
  };

  if (gifDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <GifDetail
          gif={gifDetail}
          onBack={() => handleBackButton(currentPage)}
          category={selectedCategory}
        />
      </SafeAreaView>
    );
  }

  const handleScroll = (event) => {
    event.persist();
    console.log("Hi i am from Main Screen ");
    console.log("HandleScroll", event.nativeEvent.contentOffset.y);
    console.log("Is Navigating Back", isNavigatingBack);
    
    setScrollPosition((previous) => {
     
      if(isNavigatingBack) {
        console.log("Previous**",previous)
        return previous
      }
      return event.nativeEvent.contentOffset.y
    });
    
    setIsNavigatingBack(false); // Reset the flag after handling scroll
  };
  

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <CategoriesContainer
            onSelectGifCategory={(item) => onSelectGifCategory(item)}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <GifsList
            handleScroll={(event) => handleScroll(event)}
            scrollToIndex={lastViewedIndex}
            scrollPosition={scrollPosition} // Pass scrollPosition to GifsList
            Gifs={mergedData}
            onSelectGifDetail={(item: GIF) => {
              setGifDetail(item);
            }}
            handleEndReached={handleEndReached}
            isFetching={isFetching}
            handleRefreshRequest={handleRefreshRequest}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

export default MainScreen;
