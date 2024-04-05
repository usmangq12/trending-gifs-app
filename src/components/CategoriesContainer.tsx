import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";

import { Icon } from "react-native-paper";

import { Category } from "../types";
import { categories } from "../utils";
import CommonChip from "../common/MyChip";
import { SearchIcon } from "../assets/svgs/SearchIcon";
import { CrossIcon } from "../assets/svgs/CrossIcon";

type Props = {
  onSelectGifCategory: (item: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CategoriesContainer: React.FC<Props> = ({
  onSelectGifCategory,
  setSelectedCategory,
  selectedCategory,
}) => {
  const [showInputField, setShowInputField] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChipSelect = (category: string) => {
    if (category === selectedCategory) {
      return;
    }
    onSelectGifCategory(category);
    setInputValue("");
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
      duration: 200,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowInputField(true);
  };

  const closeInputField = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setShowInputField(false);
    Keyboard.dismiss();
    if (inputValue) {
      setSelectedCategory(inputValue);
    } else {
      return setSelectedCategory(categories[0]);
    }
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (!text) {
      Keyboard.dismiss();
    }
    onSelectGifCategory(text);
  };

  const clearInputField = () => {
    setInputValue("");
    onSelectGifCategory("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {showInputField && (
          <View style={{ marginRight: 8, marginTop: 5 }}>
            <Pressable onPress={closeInputField}>
              <View style={styles.arrowIcon}>
                <Icon source="arrow-left" color="#737373" size={24} />
              </View>
            </Pressable>
          </View>
        )}
        <View style={[styles.search, { left: showInputField ? 44 : 6 }]}>
          <SearchIcon width={18} height={18} color="grey" />
        </View>
        <TextInput
          placeholder="Search"
          onFocus={onInputPress}
          onBlur={closeInputField}
          value={inputValue}
          onChangeText={handleInputChange}
          style={[
            styles.input,
            {
              width: showInputField ? "auto" : 100,
              flex: showInputField ? 1 : 0,
            },
          ]}
          blurOnSubmit={false}
          onSubmitEditing={closeInputField}
        />
        {showInputField && (
          <Pressable style={styles.cross} onPress={clearInputField}>
            <CrossIcon />
          </Pressable>
        )}
      </View>

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
    gap: 4,
    justifyContent: "center",
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
  inputContainer: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    position: "absolute",
    backgroundColor: "transparent",

    top: 12,
    zIndex: 23,
    width: 22,
    height: 22,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 16,
    height: 35,
    marginTop: 6,
    borderColor: "black",
    paddingLeft: 34,
  },
  cross: {
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
    top: 10,
    width: 16,
    height: 16,
  },
});
