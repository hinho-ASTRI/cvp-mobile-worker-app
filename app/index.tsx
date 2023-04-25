import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useAtomValue } from "jotai";

import { isLoggedInAtom } from "~atoms/isLoggedIn";

export default function Entry() {
  const [accessTokenData, setAccessToken] = useState<string>(null);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  console.log("isloggedin", isLoggedIn);
  // const getAccessToken = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem("accessToken");
  //     if (accessToken !== null) {
  //       setAccessToken(accessToken);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  // getAccessToken();

  return <Redirect href={isLoggedIn ? "/home/cert" : "/(auth)/sign-in"} />;
}
