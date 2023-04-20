import "expo-router/entry";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
// FOR TRANSLATION
import i18next from "./assets/languages/i18n-js";
import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

const queryClient = new QueryClient();

export function App() {
  const ctx = require.context("./app");
  const { i18n } = useTranslation();
  const setFontSizeData = useSetAtom(fontSizeAtom);
  const [storedValue, setStoredValue] = useState(null);

  const getFontSizeData = async () => {
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

  useEffect(() => {
    getFontSizeData();
  }, []);

  const getLanguageData = async () => {
    try {
      const language = await AsyncStorage.getItem("language");
      if (language !== null) {
        i18n.changeLanguage(language);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getLanguageData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
