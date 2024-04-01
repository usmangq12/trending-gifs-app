import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useSerachGifsQuery } from "../store/api";
import { GifsList } from "../components/GifsList";
import { GIF } from "../types";
import { GifDetail } from "../components/GifDetail";
import CategoriesContainer from "../components/CategoriesContainer";
import { SplashScreen } from "../common/SplashScreen";
import { useDebounce } from "../hooks/useDebounce";
import { categories } from "../utils";

export const MainScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  let { debouncedValue } = useDebounce(selectedCategory, 500);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data, isLoading, isFetching } = useSerachGifsQuery({
    query: debouncedValue,
    offset: currentPage * 14,
    limit: 14,
  });

  const [gifDetail, setGifDetail] = useState<GIF | null>(null);
  const [mergedData, setMergedData] = useState<GIF[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

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

  const onSelectGifCategory = (item: string) => {
    console.log("Item",item);
    setSelectedCategory(item);
  };

  const handleRefreshRequest = () => {
    setCurrentPage(0)
  }
  if (isLoading) {
    return <SplashScreen />;
  }

  if (gifDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <GifDetail
          gif={gifDetail}
          onBack={() => setGifDetail(null)}
          category={selectedCategory}
        />
      </SafeAreaView>
    );
  }

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
            Gifs={mergedData}
            onSelectGifDetail={(item: GIF) => setGifDetail(item)}
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
