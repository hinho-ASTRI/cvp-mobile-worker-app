import { Stack } from "expo-router";
import { Provider } from "~context/auth";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

export default function Layout() {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Provider>
      <Stack
        screenOptions={{
          statusBarColor: isDarkTheme ? "white" : "black",
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
      </Stack>
    </Provider>
  );
}
