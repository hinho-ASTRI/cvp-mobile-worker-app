import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getIsDarkMode: (
  setIsDarkTheme: Dispatch<boolean>,
  setTheme: Dispatch<boolean>
) => void = async (setIsDarkTheme, setTheme) => {
  const isDarkMode = await AsyncStorage.getItem("isDarkMode");
  if (isDarkMode !== null) {
    const darkMode = isDarkMode === "true";
    setIsDarkTheme(darkMode);
    setTheme(darkMode);
  }
};

export default getIsDarkMode;
