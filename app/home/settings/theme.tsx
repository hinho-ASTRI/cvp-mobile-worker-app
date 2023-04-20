import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Colors,
  SortableList,
  TouchableOpacity,
} from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";
import { DarkThemeAtom } from "~atoms/darkTheme";

Colors.loadSchemes({
  light: {
    screenBG: Colors.white,
    textColor: Colors.grey10,
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
  },
});

const setTheme = (dark: boolean): void => {
  Colors.setScheme(dark ? "dark" : "light");
};

export default function Theme() {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const [isDarkTheme, setIsDarkTheme] = useAtom(DarkThemeAtom);

  const { t } = useTranslation();
  const themeList: { theme: string; value: boolean; id: string }[] = [
    {
      theme: `${t("LightMode")}`,
      value: false,
      id: "0",
    },
    {
      theme: `${t("DarkMode")}`,
      value: true,
      id: "1",
    },
  ];
  const getIsDarkMode = async () => {
    try {
      const isDarkMode = await AsyncStorage.getItem("isDarkMode");
      if (isDarkMode !== null) {
        const darkMode = isDarkMode === "true";
        console.log("stored");
        setIsDarkTheme(darkMode);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getIsDarkMode();
  }, []);

  const [darkTheme, setDarkTheme] = useState<boolean>(isDarkTheme ?? false);

  setTheme(isDarkTheme);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: darkTheme ? "#000" : "#fff",
          },
          headerTintColor: darkTheme ? "#fff" : "#000",
        }}
      />
      <View bg-screenBG flex-1>
        <SortableList
          className="px-4"
          onOrderChange={null}
          data={themeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              bg-screenBG
              onPress={() => {
                setDarkTheme(item.value);
                setIsDarkTheme(item.value);
                AsyncStorage.setItem("isDarkMode", item.value.toString());
              }}
              className="justify-between flex-row border-b-2 py-4 border-slate-300"
            >
              <Text textColor className={`ml-4 text-${fontSizeData + 1}xl `}>
                {item.theme}
              </Text>
            </TouchableOpacity>
          )}
        />
        <StatusBar style={darkTheme ? "light" : "dark"} />
      </View>
    </>
  );
}
