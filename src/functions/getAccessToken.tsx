import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getAccessToken: (
  setIsLoggedInAtom: Dispatch<boolean>,
  setAccessToken: Dispatch<string>
) => void = async (setIsLoggedIn, setAccessToken) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken !== null) {
    setIsLoggedIn(true);
    setAccessToken(accessToken);
  }
  console.log("login?", accessToken ? "yes" : "no");
};

export default getAccessToken;
