import "expo-router/entry";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";

// FOR TRANSLATION
import i18next from "./assets/languages/i18n-js";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import getFontSizeData from "~functions/getFontSizeData";
import getLanguageData from "~functions/getLanguageData";

const queryClient = new QueryClient();

export function App() {
  const ctx = require.context("./app");
  const { i18n } = useTranslation();

  const setFontSizeData = useSetAtom(fontSizeAtom);
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    getFontSizeData(setStoredValue, setFontSizeData);
    getLanguageData(i18n);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
