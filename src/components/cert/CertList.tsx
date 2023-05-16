import { FlatList } from "react-native";
import { View } from "react-native-ui-lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CertListItem from "./CertListItem";
import FilterButton from "~components/filter/FilterButton";
import FilterForCertList from "~components/filter/certList/FilterForCertList";
import NumberOfSelectedResults from "~components/filter/certList/NumberOfSelectedResults";

type CertListProprs = {
  data: any[];
};

const CertList: React.FC<CertListProprs> = ({ data }) => {
  const { t } = useTranslation();
  const [isDown, setIsDown] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any[] | null>(null);
  const [numberOfFilteredData, setNumberOfFilteredData] =
    useState<number>(null);
  const [selectedValid, setSelectedValid] = useState<string[]>([
    "Valid",
    "Not Valid",
  ]);

  const handleFilter = (value: string) => {
    let updatedValidButtons = [...selectedValid];

    if (!updatedValidButtons.includes(value)) {
      updatedValidButtons.push(value);
    } else {
      updatedValidButtons = updatedValidButtons.filter(
        (item) => item !== value
      );
    }

    setSelectedValid(updatedValidButtons);
    const selectedData = data.filter((item) =>
      updatedValidButtons.includes(item.is_valid ? "Valid" : "Not Valid")
    );

    setFilteredData(selectedData);
    setNumberOfFilteredData(selectedData.length);
  };

  return (
    <View flex>
      <View
        bg-screenBG
        className="flex-row border-b-2 border-slate-300 h-[50] items-center justify-between px-4"
      >
        <NumberOfSelectedResults
          selectedValid={selectedValid}
          dataLength={data.length}
          numberOfFilteredData={numberOfFilteredData}
        />
        <FilterButton
          isDown={isDown}
          setIsDown={setIsDown}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      </View>
      {isVisible && (
        <FilterForCertList
          onFilter={handleFilter}
          selectedValid={selectedValid}
        />
      )}
      <View className="p-4 flex-1">
        <FlatList
          data={filteredData ? filteredData : data}
          renderItem={({ item }) => <CertListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default CertList;
