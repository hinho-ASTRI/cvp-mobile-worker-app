import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getAccessToken: (
  setStoredValue: Dispatch<number>,
  setFontSizeData: Dispatch<number>
) => void = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      const accessTokenData = accessToken;
    }
  } catch (e) {
    // error reading value
  }
};

export default getAccessToken;
