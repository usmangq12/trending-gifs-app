// CategoriesContainer.tsx
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import CommonChip from "../common/MyChip";

type Category = string;

type Props = {
  onSelectGifCategory: (item: string | null) => void;
};

const categories: Category[] = [
  "Animals",
  "Sports",
  "Movies",
  "Music",
  "Funny",
  "Nature",
  "Tech",
];

const CategoriesContainer: React.FC<Props> = ({ onSelectGifCategory }) => {

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    categories[0]
  );

  const handleChipSelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    onSelectGifCategory(category);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <CommonChip
      category={item}
      onSelect={() => handleChipSelect(item)}
      selected={item === selectedCategory}
    />
  );

  return (
    <View
      style={{
        paddingVertical: 2,
        backgroundColor: "transparent",
        marginTop: 10,
      }}
    >
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item} // Change if your category structure is more complex
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 4, // Adjust this for padding on the sides of the list
          marginTop: 6,
        }}
      />
    </View>
  );
};

export default CategoriesContainer;
