import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getAccessToken: (setIsLoggedInAtom: Dispatch<boolean>) => void = async (
  setIsLoggedIn
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken !== null) {
    setIsLoggedIn(true);
  }
  console.log("login?", accessToken ? "yes" : "no");
};

export default getAccessToken;
