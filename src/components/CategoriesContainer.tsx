import React, { useState, useRef } from "react";
import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import CommonChip from "../common/MyChip";
import { TextInput as PaperTextInput } from "react-native-paper";
import { CrossIcon } from "../assets/svgs/CrossIcon";
import { SearchIcon } from "../assets/svgs/SearchIcon";
import { Icon } from "react-native-paper";
import { Category } from "../types";
import { categories } from "../utils";

type Props = {
  onSelectGifCategory: (item: string) => void;
  selectedCategory: string;
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CategoriesContainer: React.FC<Props> = ({
  onSelectGifCategory,
  selectedCategory,
}) => {
  const [showInputField, setShowInputField] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<typeof PaperTextInput>(null);

  const handleChipSelect = (category: string) => {
    onSelectGifCategory(category === selectedCategory ? "" : category);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <CommonChip
      category={item}
      onSelect={() => handleChipSelect(item)}
      selected={item === selectedCategory}
    />
  );

  const onInputPress = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowInputField(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeInputField = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowInputField(false);
    onSelectGifCategory(categories[0]);
    clearInputField();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onSelectGifCategory(text);
  };

  const clearInputField = () => {
    setInputValue("");
  };

  return (
    <View style={styles.container}>
      {showInputField && (
        <View style={{ marginRight: 5, marginTop: 5 }}>
          <Pressable onPress={closeInputField}>
            <View style={styles.arrowIcon}>
              <Icon source="arrow-left" color="#737373" size={24} />
            </View>
          </Pressable>
        </View>
      )}
      <PaperTextInput
        ref={inputRef}
        placeholder="Search"
        onFocus={onInputPress}
        onBlur={closeInputField}
        value={inputValue}
        onChangeText={handleInputChange}
        mode="outlined"
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          width: showInputField ? "100%" : "auto",
          height: 35,
          flex: showInputField ? 1 : 0,
          marginTop: 6,
          borderColor: "black",
        }}
        theme={{
          roundness: 30,
          colors: {
            primary: "#a6a6a6",
            background: "white",
          },
        }}
        right={
          showInputField ? (
            <PaperTextInput.Icon
              icon={() => (
                <View style={styles.crossIcon}>
                  <CrossIcon />
                </View>
              )}
              onPress={clearInputField}
            />
          ) : null
        }
        left={
          <PaperTextInput.Icon
            style={{ marginLeft: 15 }}
            icon={() => <SearchIcon color={"black"} />}
          />
        }
      />
      {!showInputField && (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 4,
            marginTop: 6,
          }}
        />
      )}
    </View>
  );
};

export default CategoriesContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  arrowIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 50,
    padding: 5,
  },
  crossIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 50,
  },
});
