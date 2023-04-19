import { TouchableOpacity } from "react-native";
import React from "react";

type MyButtonProps = {
  onPress?: () => void;
  style?: string;
  children: React.ReactNode;
};

const MyButton: React.FC<MyButtonProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className="bg-black flex-row p-3 sm:p-5 rounded-full border-white border-2 m-4"
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default MyButton;
