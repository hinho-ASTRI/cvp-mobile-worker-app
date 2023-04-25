import { Stack } from "expo-router";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

export default function Layout() {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Stack
      screenOptions={{
        statusBarColor: isDarkTheme ? "white" : "black",
        headerStyle: {
          backgroundColor: isDarkTheme ? "#000" : "#fff",
        },
        headerTintColor: isDarkTheme ? "#fff" : "#000",

        // statusBarStyle: isDarkTheme ? "light" : "dark",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerTitle: "Info",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/sign-in"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
