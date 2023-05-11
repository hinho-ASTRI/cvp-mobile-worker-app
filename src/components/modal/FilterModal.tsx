import { View } from "react-native";
import { Dispatch, useState } from "react";
import { Text, TouchableOpacity } from "react-native-ui-lib";
import { useAtomValue, useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { Modal } from "~components/modal/Modal";

type FilterModalProps = {
  setIsVisible: Dispatch<boolean>;
  isVisible: boolean;
};

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const { t } = useTranslation();

  const isDarkTheme = useAtomValue(DarkThemeAtom);
  const [storedValue, setStoredValue] = useState<null | number>(null);
  const [valueInModal, setValue] = useState<number>(storedValue ?? 1);
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);

  return (
    <Modal
      animationIn={"slideInDown"}
      animationOut={"slideOutUp"}
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
            <View className="mx-4"></View>
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

export default FilterModal;
