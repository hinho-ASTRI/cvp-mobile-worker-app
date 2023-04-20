import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

export default function Layout() {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? "#000" : "#fff",
        },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: `${t("Settings")}`,
          statusBarColor: isDarkTheme ? "white" : "black",

          // statusBarStyle: isDarkTheme ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          headerTitle: `${t("Language")}`,
        }}
      />
      <Stack.Screen
        name="fontSize"
        options={{ headerTitle: `${t("FontSize")}` }}
      />

      <Stack.Screen
        name="theme"
        options={{
          headerTitle: `${t("DarkMode")}`,
        }}
      />
      <Stack.Screen name="Settings" />
    </Stack>
  );
}
