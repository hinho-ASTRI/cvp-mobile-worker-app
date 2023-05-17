import { View, Text } from "react-native-ui-lib";
import { FlatList } from "react-native";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";
import FilterScroll from "./FilterScroll";
import { FilterFieldsProps } from "~components/cert/CertList";

type FilterProps = {
  filterFields: FilterFieldsProps[];
  selectedValidButtons: string[];
  selectedCertButtons: string[];
  selectedIssuerButtons: string[];
  onFilter: (value: string) => void;
};

const FilterForCertList: React.FC<FilterProps> = ({
  filterFields,
  selectedValidButtons,
  selectedCertButtons,
  selectedIssuerButtons,
  onFilter,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const mappingButtons = {
    Valid: selectedValidButtons,
    "Credential Type": selectedCertButtons,
    Issuer: selectedIssuerButtons,
  };

  return (
    <View bg-screenBG className="h-[100%]">
      <FlatList
        data={filterFields}
        renderItem={({ item }) => (
          <View className="border-slate-300 border-b-2 py-4 pl-4 flex-1 mt-2">
            <Text textColor className={`text-${fontSizeData + 1}xl mb-4`}>
              {Object.keys(item)}
            </Text>
            <FilterScroll
              data={Object.values(item)[0]}
              setData={onFilter}
              selectedButtons={mappingButtons[Object.keys(item)[0]]}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default FilterForCertList;
