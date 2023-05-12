import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { FlatList, ScrollView } from "react-native";
import { useAtomValue } from "jotai";
import { Dispatch } from "react";

import { DarkThemeAtom } from "~atoms/darkTheme";

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type item = Pick<fields, "Credential Type" | "Issuer">;

type FilterProps = {
  data: item[];
  fontSizeData: number;
  onFilter: (value: any) => void;
  selectedButtons: any[];
  selectedSort: string;
  setSort: Dispatch<string>;
};

const Filter: React.FC<FilterProps> = ({
  data,
  fontSizeData,
  onFilter,
  selectedButtons,
  selectedSort,
  setSort,
}) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);
  console.log(data, "data");

  return (
    <View className="h-[100%]">
      <FlatList
        ListHeaderComponent={() => (
          <View className="border-slate-300 border-b-2 py-6 pl-4 flex-1">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              Sort by
            </Text>
            <ScrollView horizontal>
              {["Date: New to Old", "Date: Old to New"].map((value, index) => (
                <TouchableOpacity
                  key={index}
                  className={`border-2 rounded-lg items-center justify-center mr-2 ${
                    selectedSort === value
                      ? ` ${
                          isDarkTheme
                            ? "bg-[#ff6a0d] border-[#fbd582]"
                            : "bg-[#fbd582] border-[#f6971a]"
                        } `
                      : "border-slate-300"
                  }`}
                  onPress={() => {
                    setSort(value);
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
            </ScrollView>
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <View className="border-slate-300 border-b-2 py-6 pl-4">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              {Object.keys(item)}
            </Text>
            <ScrollView horizontal>
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
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default Filter;
