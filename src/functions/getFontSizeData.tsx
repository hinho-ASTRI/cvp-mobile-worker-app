import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getFontSizeData: (
  setStoredValue: Dispatch<number>,
  setFontSizeData: Dispatch<number>
) => void = async (setStoredValue, setFontSizeData) => {
  try {
    const fontSize = await AsyncStorage.getItem("fontSize");
    if (fontSize !== null) {
      const appFontSize = parseInt(fontSize);
      setStoredValue(appFontSize);
      setFontSizeData(appFontSize);
    }
  } catch (e) {
    // error reading value
  }
};

export default getFontSizeData;
