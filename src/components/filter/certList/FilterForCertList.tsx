import { View, Text } from "react-native-ui-lib";
import { FlatList } from "react-native";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";
import FilterScroll from "./FilterScroll";

type FilterProps = {
  selectedValid: string[];
  onFilter: (value: string) => void;
};

const FilterForCertList: React.FC<FilterProps> = ({
  selectedValid,
  onFilter,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  return (
    <View bg-screenBG className="h-[100%]">
      <FlatList
        data={[{ Valid: ["Valid", "Not Valid"] }]}
        renderItem={({ item }) => (
          <View className="border-slate-300 border-b-2 py-6 pl-4 flex-1 mb-8 ">
            <Text textColor className={`text-${fontSizeData + 1}xl mb-4`}>
              {Object.keys(item)}
            </Text>
            <FilterScroll
              data={Object.values(item)[0]}
              setData={onFilter}
              selectedData={selectedValid}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default FilterForCertList;
