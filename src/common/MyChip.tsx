import React from "react";
import { Chip } from "react-native-paper";

type Category = string;

type CommonChipProps = {
  category: Category;
  onSelect: () => void;
  selected: boolean;
};

const MyChip: React.FC<CommonChipProps> = ({
  category,
  onSelect,
  selected,
}) => {
  const handlePress = () => {
  return   onSelect();
  };

  return (
    <Chip
      mode="flat"
      onPress = {handlePress}
      style={{
        backgroundColor: selected ? "black" : "white",
        borderRadius: 20,
        borderWidth: selected ? 1 : 0,
      }}
      textStyle={{
        color: selected ? "white" : "black",
      }}
    >
      {category}
    </Chip>
  );
};

export default MyChip;
