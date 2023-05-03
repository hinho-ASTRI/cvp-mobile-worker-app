import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom, useAtomValue } from "jotai";
import setTypography from "assets/typography/typography";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { fontSizeAtom } from "~atoms/fontSize";
import { useRouter } from "expo-router";
import CustomButton from "~components/buttons/CustomButton";

import FontSizeModal from "~components/modal/FontSizeModal";
enum FontSize {
  Smaller,
  Default,
  Larger,
}

export default function FontSlider() {
  const router = useRouter();
  const isDarkTheme = useAtomValue(DarkThemeAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);

  const getFontSizeData = async () => {
    const fontSize = await AsyncStorage.getItem("fontSize");
    if (fontSize !== null) {
      const appFontSize = parseInt(fontSize);
      setStoredValue(appFontSize);
      setFontSizeData(appFontSize);
    }
  };

  useEffect(() => {
    getFontSizeData();
  }, []);

  useEffect(() => {
    setTypography(fontSizeData);
  }, [fontSizeData]);

  const [storedValue, setStoredValue] = useState<null | number>(null);
  const [value, setValue] = useState<number>(storedValue ?? 1);

  const { t } = useTranslation();
  const valueChangeHandler: (fontSize: number) => void = (fontSize) => {
    setValue(fontSize);
    setFontSizeData(fontSize);
  };

  // ThemeManager.setComponentTheme("Text", {
  //   h1: fontSizeData === 0 ? true : false,
  //   h2: fontSizeData === 1 ? true : false,
  //   h3: fontSizeData === 2 ? true : false,
  // });
  return (
    <View className="mx-16">
      <View className="mt-10">
        <View className="items-center mb-4">
          <Text textColor className="text-2xl">{`${t(
            `${FontSize[value]}`
          )}`}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={2}
          minimumTrackTintColor={isDarkTheme ? "#fff" : "#000000"}
          maximumTrackTintColor={isDarkTheme ? "#847e7e" : "#c7bdbdbd"}
          step={1}
          thumbTintColor={isDarkTheme ? "#fff" : "#000000"}
          tapToSeek={true}
          value={fontSizeData}
          onValueChange={valueChangeHandler}
        />
        <View className="flex-row justify-between top-[-25] -z-[1]">
          {[...Array(3).keys()].map((index) => {
            const dotColor =
              index < fontSizeData
                ? isDarkTheme
                  ? "#fff"
                  : "#000"
                : isDarkTheme
                ? "#847e7e"
                : "#c7bdbdbd";
            return (
              <View
                key={index}
                style={{
                  backgroundColor: dotColor,
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  marginHorizontal: 3,
                }}
              />
            );
          })}
        </View>
      </View>
      <View className="justify-between flex-row">
        <Text textColor className="text-xl">
          A
        </Text>
        <Text textColor className="text-3xl">
          A
        </Text>
      </View>
      <View className="items-center">
        <Text textColor>{`${t(`${t("AdjustFontSize")}`)}`}</Text>
        <Text textColor>{fontSizeData}</Text>
        <Text textColor h1>
          {fontSizeData}
        </Text>
        <Text textColor h2>
          {fontSizeData}
        </Text>
      </View>
      <View className="flex-row justify-center my-3">
        <CustomButton
          text="Confirm"
          onPress={() => {
            AsyncStorage.setItem("fontSize", fontSizeData.toString());
            router.push("/home/cert");
            console.log("fontSizeData", fontSizeData);
          }}
          bgColor="black"
          fgColor="black"
          flexDir="column"
        />
        <CustomButton
          text="Modal"
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          bgColor="black"
          fgColor="black"
          flexDir="column"
        />

        {/* <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          style={
            {
              // flexDirection: "row",
              // justifyContent: "end",
            }
          }
        >
          <Modal.Container>
            <Modal.Header title="Set Font Size" />
            <Modal.Body>
              <View className="mx-4">
                <Slider
                  minimumValue={0}
                  maximumValue={2}
                  minimumTrackTintColor={isDarkTheme ? "#fff" : "#000000"}
                  maximumTrackTintColor={isDarkTheme ? "#847e7e" : "#c7bdbdbd"}
                  step={1}
                  thumbTintColor={isDarkTheme ? "#fff" : "#000000"}
                  tapToSeek={true}
                  value={fontSizeData}
                  onValueChange={valueChangeHandler}
                />
                <View className="flex-row justify-between top-[-25] -z-[1]">
                  {[...Array(3).keys()].map((index) => {
                    const dotColor =
                      index < fontSizeData
                        ? isDarkTheme
                          ? "#fff"
                          : "#000"
                        : isDarkTheme
                        ? "#847e7e"
                        : "#c7bdbdbd";
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: dotColor,
                          width: 10,
                          height: 10,
                          borderRadius: 99,
                          marginHorizontal: 3,
                        }}
                      />
                    );
                  })}
                </View>
                <View className="justify-between flex-row">
                  <Text textColor className="text-xl">
                    A
                  </Text>
                  <Text textColor className="text-3xl">
                    A
                  </Text>
                </View>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button
                title="Ok"
                onPress={() => {
                  setIsVisible(false);
                  AsyncStorage.setItem("fontSize", fontSizeData.toString());
                  router.push("/home/cert");
                  console.log("fontSizeData", fontSizeData);
                }}
              />
            </Modal.Footer>
          </Modal.Container>
        </Modal> */}
        <FontSizeModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </View>
    </View>
  );
}
