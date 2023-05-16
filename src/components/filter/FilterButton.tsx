import { View, Button } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

type FilterButtonProps = {
  isDown: boolean;
  setIsDown: Dispatch<boolean>;
  setIsVisible: Dispatch<boolean>;
  isVisible: boolean;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  isDown,
  setIsDown,
  setIsVisible,
  isVisible,
}) => {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);
  return (
    <Button
      bg-textColor
      label={`${t("Filter")}`}
      screenBG
      iconOnRight
      iconSource={() => (
        <View className="ml-2">
          <AntDesign
            name={isDown ? "caretdown" : "caretup"}
            size={12}
            color={`${isDarkTheme ? "black" : "white"}`}
          />
        </View>
      )}
      onPress={() => {
        setIsDown(!isDown);
        setIsVisible(!isVisible);
      }}
      borderRadius={15}
    ></Button>
  );
};

export default FilterButton;
