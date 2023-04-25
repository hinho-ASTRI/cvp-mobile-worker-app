import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Entry() {
  const [accessTokenData, setAccessToken] = useState<string>(null);

  const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken !== null) {
        setAccessToken(accessToken);
      }
    } catch (e) {
      // error reading value
    }
  };
  getAccessToken();

  return <Redirect href={accessTokenData ? "/home" : "/(auth)/sign-in"} />;
}
