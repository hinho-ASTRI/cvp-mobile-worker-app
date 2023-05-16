import { View, Text } from "react-native-ui-lib";
import { FlatList } from "react-native";
import { Dispatch } from "react";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";
import FilterScroll from "./FilterScroll";

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type item = Pick<fields, "Credential Type" | "Issuer">;

type FilterProps = {
  data: item[];
  onFilter: (value: any) => void;
  selectedButtons?: any[];
  selectedSort?: string;
  setSort?: Dispatch<string>;
  selectedValid: string[];
  setSelectedValid: Dispatch<string[]>;
};

const Filter: React.FC<FilterProps> = ({
  data,
  onFilter,
  selectedButtons,
  selectedSort,
  setSort,
  selectedValid,
  setSelectedValid,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const validHandler = (value: string) => {
    let updatedValidButtons = [...selectedValid];
    if (!updatedValidButtons.includes(value)) {
      updatedValidButtons.push(value);
    } else {
      updatedValidButtons = updatedValidButtons.filter(
        (item) => item !== value
      );
    }
    console.log(updatedValidButtons);
    // The pressed filter button
    setSelectedValid(updatedValidButtons);
  };

  function setData(value: string) {
    validHandler(value);
    onFilter(value);
  }

  return (
    <View className="h-[100%]">
      <FlatList
        ListHeaderComponent={() => (
          <View className="border-slate-300 border-b-2 py-6 pl-4 flex-1">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              Sort by
            </Text>
            <FilterScroll
              data={["Date: New to Old", "Date: Old to New"]}
              setData={setSort}
              selectedData={selectedSort}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View className="border-slate-300 border-b-2 py-6 pl-4 flex-1 mb-8 ">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              Valid
            </Text>
            <FilterScroll
              data={["Valid", "Not Valid"]}
              setData={setData}
              selectedData={selectedValid}
            />
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <View className="border-slate-300 border-b-2 py-6 pl-4">
            <Text textColor className={`text-${fontSizeData + 2}xl mb-4`}>
              {Object.keys(item)}
            </Text>
            <FilterScroll
              data={Object.values(item)[0]}
              setData={onFilter}
              selectedData={selectedButtons}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default Filter;
