import { useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, SortableList, TouchableOpacity } from "react-native-ui-lib";
import setTheme from "~functions/setTheme";
import { useAtomValue, useAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";
import { DarkThemeAtom } from "~atoms/darkTheme";

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

  const [darkTheme, setDarkTheme] = useState<boolean>(isDarkTheme ?? false);

  return (
    <SortableList
      // className="px-4"
      onOrderChange={null}
      data={themeList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          bg-screenBG
          onPress={() => {
            setDarkTheme(item.value);
            setIsDarkTheme(item.value);
            setTheme(item.value);
            AsyncStorage.setItem("isDarkMode", item.value.toString());
          }}
          className="justify-between flex-row border-b-2 py-4 border-slate-300"
        >
          <Text textColor className={`ml-4 text-${fontSizeData + 1}xl px-2`}>
            {item.theme}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
