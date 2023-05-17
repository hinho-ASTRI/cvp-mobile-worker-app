import { useAtomValue } from "jotai";
import { Text } from "react-native-ui-lib";
import { TouchableOpacity, ScrollView } from "react-native";

import { DarkThemeAtom } from "~atoms/darkTheme";
import { fontSizeAtom } from "~atoms/fontSize";

type FilterScrollProps = {
  data: string[];
  setData: (value: string) => void;
  selectedButtons: string[];
};

const FilterScroll: React.FC<FilterScrollProps> = ({
  data,
  setData,
  selectedButtons,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <ScrollView horizontal>
      {data.map((value: string, index: number) => (
        <TouchableOpacity
          key={index}
          className={`border-2 rounded-lg items-center justify-center mr-2 ${
            selectedButtons.includes(value)
              ? ` ${
                  isDarkTheme
                    ? "bg-[#ff6a0d] border-[#fbd582]"
                    : "bg-[#fbd582] border-[#f6971a]"
                } `
              : "border-slate-300"
          }`}
          onPress={() => {
            setData(value);
            console.log(value);
          }}
        >
          <Text textColor className={`text-${fontSizeData + 1}xl p-1.5 my`}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterScroll;
