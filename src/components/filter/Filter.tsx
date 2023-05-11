import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { FlatList } from "react-native";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type item = Pick<fields, "Credential Type" | "Issuer">;

type FilterProps = {
  data: item[];
  fontSizeData: number;
  onFilter: any;
  selectedButtons: any;
};

const Filter: React.FC<FilterProps> = ({
  data,
  fontSizeData,
  onFilter,
  selectedButtons,
}) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);
  // console.log(data, "data");
  return (
    <View className="h-[100%]">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View className="border-slate-300 border-b-2 py-6 pl-4">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              {Object.keys(item)}
            </Text>
            <View className="flex-row ">
              {Object.values(item)[0].map((value, index) => (
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
                    onFilter(value);
                  }}
                >
                  <Text
                    textColor
                    className={`text-${fontSizeData + 1}xl p-1.5 my`}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default Filter;
