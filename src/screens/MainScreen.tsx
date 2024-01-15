import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSerachGifsQuery } from "../store/api";
import { GifsList } from "../components/GifsList";
import { GIF } from "../types";
import { GifDetail } from "../components/GifDetail";
import CategoriesContainer from "../components/CategoriesContainer";
import { SplashScreen } from "../common/SplashScreen";
import { useDebounce } from "../hooks/useDebounce";
import { categories } from "../utils";

export const MainScreen = () => {
  // Using the auto-generated useSerachGifsQuery hook from RTK Query to avoid multiple API requests
  // This hook is generated based on the configuration defined in api.ts
  // It returns an object with data and loading status

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const { debouncedValue } = useDebounce(selectedCategory, 500);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { data } = useSerachGifsQuery({
    query: debouncedValue,
    offset: currentPage * 25,
    limit: 25,
  });
  const [gifDetail, setGifDetail] = useState<GIF | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  const loadMoreData = async () => {
    try {
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <CategoriesContainer
          onSelectGifCategory={(item: string) => {
            setSelectedCategory(item);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
        />
        <GifsList
          Gifs={data}
          onSelectGifDetail={(item: GIF) => setGifDetail(item)}
          handleEndReached={loadMoreData}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
