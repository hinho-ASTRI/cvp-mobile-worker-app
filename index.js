import "expo-router/entry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useSetAtom } from "jotai";
import { useAtomValue } from "jotai";
import { DarkThemeAtom } from "~atoms/darkTheme";

import { isLoggedInAtom } from "~atoms/isLoggedIn";

// FOR TRANSLATION
import i18next from "./assets/languages/i18n-js";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import getFontSizeData from "~functions/getFontSizeData";
import getLanguageData from "~functions/getLanguageData";

const queryClient = new QueryClient();

export function App() {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const ctx = require.context("./app");
  const { i18n } = useTranslation();

  const setFontSizeData = useSetAtom(fontSizeAtom);
  const [storedValue, setStoredValue] = useState(null);
  const setIsLoggedInAtom = useSetAtom(isLoggedInAtom);

  const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      setIsLoggedInAtom(true);
    }
    console.log("login?", accessToken ? "yes" : "no");
    setTimeout(() => {
      if (accessToken != null) {
      } else {
      }
    }, 2000);
  };

  useEffect(() => {
    getFontSizeData(setStoredValue, setFontSizeData);
    getLanguageData(i18n);
    getAccessToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} />
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
