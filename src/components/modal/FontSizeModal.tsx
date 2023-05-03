import { View } from "react-native";
import { Dispatch, useState } from "react";
import { Text, TouchableOpacity } from "react-native-ui-lib";
import Slider from "@react-native-community/slider";
import { useAtomValue, useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { Modal } from "~components/modal/Modal";

type FontSizeModalProps = {
  setIsVisible: Dispatch<boolean>;
  isVisible: boolean;
};

export const FontSizeModal: React.FC<FontSizeModalProps> = (props) => {
  const { t } = useTranslation();

  const getFontSizeData = async () => {
    const fontSize = await AsyncStorage.getItem("fontSize");
    if (fontSize !== null) {
      const appFontSize = parseInt(fontSize);
      setStoredValue(appFontSize);
      setFontSizeData(appFontSize);
    }
  };
  const isDarkTheme = useAtomValue(DarkThemeAtom);
  const [storedValue, setStoredValue] = useState<null | number>(null);
  const [valueInModal, setValue] = useState<number>(storedValue ?? 1);
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);
  const [tempFontSize, setTempFontSize] = useState<number>(fontSizeData);

  const valueChangeHandler: (fontSize: number) => void = (fontSize) => {
    setValue(fontSize);
    setTempFontSize(fontSize);
    // setFontSizeData(fontSize);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => {
        props.setIsVisible(false);
        setValue(valueInModal);
        setFontSizeData(valueInModal);
        AsyncStorage.setItem("fontSize", fontSizeData.toString());
      }}
    >
      <Modal.Container>
        <View className={`rounded-xl bg-${isDarkTheme ? "black" : "white"}`}>
          <Modal.Header>
            <Text textColor center className="text-xl">
              {`${t("AdjustFontSize")}`}
            </Text>
          </Modal.Header>
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
                    index < tempFontSize
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

              <View className="h-[60px]">
                <Text textColor className={`text-${tempFontSize + 1}xl`}>
                  {`${t("SampleText")}`}
                </Text>
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <View className="mb-8">
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setValue(valueInModal);
                  setFontSizeData(valueInModal);
                  AsyncStorage.setItem("fontSize", fontSizeData.toString());
                }}
              >
                <Text textColor className="text-3xl">
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  );
};

export default FontSizeModal;
