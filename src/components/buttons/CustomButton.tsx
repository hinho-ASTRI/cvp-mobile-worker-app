import React from "react";
import { View, Text, Pressable } from "react-native";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  bgColor: string;
  fgColor: string;
  children?: React.ReactNode;
  widthPerct?: string;
  addStyle?: {};
  icon?: React.ReactElement;
  flexDir?: "column" | "column-reverse" | "row" | "row-reverse";
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  bgColor,
  fgColor,
  widthPerct,
  addStyle,
  icon,
  flexDir = "row",
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-[60%] items-center my-2 p-2.5 md:p-4 rounded-md"
      style={[
        bgColor ? { backgroundColor: bgColor } : {},
        widthPerct ? { width: widthPerct } : {},
        addStyle ? addStyle : {},
        flexDir ? { flexDirection: flexDir } : {},
      ]}
    >
      {icon && <View className="mr-4">{icon}</View>}

      <Text className="grow text-white mx-1.5 font-bold">{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
