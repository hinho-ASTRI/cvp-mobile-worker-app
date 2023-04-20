import { Text, Pressable, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fontSizeAtom } from "~atoms/fontSize";

const languageList = ["繁體中文", "简体中文", "English"];
export default function Language() {
  const { i18n } = useTranslation();
  const fontSizeData = useAtomValue(fontSizeAtom);

  const getLanguageData = async () => {
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

  return (
    <FlatList
      data={languageList}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            i18n.changeLanguage(item);
            AsyncStorage.setItem("language", item);
          }}
          className="flex-row border-b-2 py-4 mx-2 border-slate-300"
        >
          <Text className={`ml-4 text-${fontSizeData + 1}xl text-start`}>
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
