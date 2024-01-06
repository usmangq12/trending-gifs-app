import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDebounce } from "../hooks/useDebounce";
import { useSerachGifsQuery } from "../store/api";
import { GifsList } from "../components/GifsList";
import { GIF } from "../types";
import { GifDetail } from "../components/GifDetail";

export const SearchedGifsScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { debouncedValue } = useDebounce(searchQuery, 500);
  // Using the auto-generated useSerachGifsQuery hook from RTK Query to avoid multiple API requests
  // This hook is generated based on the configuration defined in api.ts
  // It returns an object with data and loading status
  const { data = [] } = useSerachGifsQuery(debouncedValue);
  const [selectedGif, setSelectedGif] = useState<GIF | null>();

  const onSelectGifDetail = (item: GIF) => {
    setSelectedGif(item);
  };
  const handleCloseImageDetail = () => {
    setSelectedGif(null);
  };

  if (selectedGif) {
    return (
      <GifDetail gif={selectedGif} onCloseDetailView={handleCloseImageDetail} />
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        editable
        mode="outlined"
        onChangeText={(text) => {
          text.trim();
          setSearchQuery(text);
        }}
        value={searchQuery}
        placeholder="Search gif here"
        placeholderTextColor="black"
      />
      {data.data && (
        <GifsList
          Gifs={data?.data}
          onSelectGifDetail={(item: GIF) => onSelectGifDetail(item)}
        />
      )}
    </View>
  );
};
