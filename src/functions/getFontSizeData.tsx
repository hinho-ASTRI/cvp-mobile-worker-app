import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getFontSizeData: (setFontSizeData: Dispatch<number>) => void = async (
  setFontSizeData
) => {
  const fontSize = await AsyncStorage.getItem("fontSize");
  if (fontSize !== null) {
    const appFontSize = parseInt(fontSize);
    setFontSizeData(appFontSize);
  }
};

export default getFontSizeData;
