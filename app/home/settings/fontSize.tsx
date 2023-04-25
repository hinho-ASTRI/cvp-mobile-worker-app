import Slider from "@react-native-community/slider";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

enum FontSize {
  Smaller,
  Default,
  Larger,
}

export default function FontSlider() {
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);

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

  const [storedValue, setStoredValue] = useState<null | number>(null);
  const [value, setValue] = useState<number>(storedValue ?? 1);

  const { t } = useTranslation();
  const valueChangeHandler = (value: number) => {
    setValue(value);
    AsyncStorage.setItem("fontSize", value.toString());
    getFontSizeData();
    console.log("fontSizeData", fontSizeData);
  };

  return (
    <View className="mx-16">
      <View className="mt-10">
        <View className="items-center mb-4">
          <Text className="text-2xl">{`${t(`${FontSize[value]}`)}`}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={2}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#c7bdbdbd"
          step={1}
          tapToSeek={true}
          value={storedValue}
          onValueChange={valueChangeHandler}
        />
      </View>
      <View className="justify-between flex-row">
        <Text className="my-3 ">A</Text>
        <Text className="text-2xl">A</Text>
      </View>
      <View className="items-center">
        <Text className={`text-${fontSizeData + 1}xl`}>{`${t(
          `${t("AdjustFontSize")}`
        )}`}</Text>
      </View>
    </View>
  );
}
