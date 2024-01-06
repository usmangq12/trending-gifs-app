import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSerachGifsQuery } from "../store/api";
import { GifsList } from "../components/GifsList";
import { Loader } from "../common/Loader";
import CategoriesContainer from "../components/CategoriesContainer";

export const MainScreen = () => {
  // Using the auto-generated useSerachGifsQuery hook from RTK Query to avoid multiple API requests
  // This hook is generated based on the configuration defined in api.ts
  // It returns an object with data and loading status
  const [gifCategory, setGifCategoryCategory] = useState<string | null>(
    "Animals"
  );
 
  const { data = [], isLoading } = useSerachGifsQuery(gifCategory);

  if (isLoading) {
    return <Loader />;
  }

  if (data?.data) {
    return (
      <SafeAreaView style={styles.container}>
        <CategoriesContainer
          onSelectGifCategory={(item: string | null) =>
            setGifCategoryCategory(item)
          }
        />
        <GifsList
          Gifs={data?.data}
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
