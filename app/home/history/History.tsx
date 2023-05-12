import * as SQLite from "expo-sqlite";
import { View } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import fetchScannedData from "~functions/sqlite/fetchScannedData";
import NumberOfSelectedResults from "~components/filter/NumberOfSelectedResults";
import FilterButton from "~components/filter/FilterButton";
import { item } from "~components/filter/Filter";
import Filter from "~components/filter/Filter";
import { fontSizeAtom } from "~atoms/fontSize";
import HistoryItem from "~components/history/HistoryItem";

export interface IHistoryItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  extra: string;
  is_valid: number;
  issuer: string;
  start_date: string;
  worker_signature: string;
  scanned_date: string;
  timeStamp: number;
}

export default function History() {
  const { t } = useTranslation();

  const db = SQLite.openDatabase("scanned_cert_data.db");

  const fontSizeData = useAtomValue(fontSizeAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [isDown, setIsDown] = useState<boolean>(true);
  const [data, setData] = useState<null | IHistoryItem[]>(null);
  const [numberOfResults, setNumberOfResults] = useState<null | number>(null);

  // filter
  const [distinctCredential_type, setDistinctCredential_type] = useState<
    string[]
  >([]);
  const [distinctIssuer, setDistinctIssuer] = useState<string[]>([]);
  const [filter, setFilter] = useState<item[]>([]);
  const [selectedData, setSelectedData] = useState<null | IHistoryItem[]>(null);
  const [numberOfSelectedData, setNumberOfSelectedData] = useState<
    null | number
  >(null);
  const [selectedButtons, setSelectedButtons] = useState<any[]>([]);
  //sort
  const [selectedSort, setSelectedSort] = useState<string>("Date: New to Old");

  useEffect(() => {
    fetchScannedData(
      db,
      setNumberOfResults,
      setData,
      setDistinctCredential_type,
      setDistinctIssuer,
      setFilter,
      setSelectedButtons
    );
  }, []);

  const handleFilter = (value: string) => {
    let updatedSelectedButtons = [...selectedButtons];
    if (!updatedSelectedButtons.includes(value)) {
      updatedSelectedButtons.push(value);
    } else {
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (item) => item !== value
      );
    }
    // The pressed filter button
    setSelectedButtons(updatedSelectedButtons);
    console.log(updatedSelectedButtons, "updatedSelectedButtons");
    const filteredData = data.filter(
      (item) =>
        updatedSelectedButtons.includes(item.issuer) ||
        updatedSelectedButtons.includes(item.credential_type)
    );

    setSelectedData(filteredData);
    setNumberOfSelectedData(filteredData.length);
    console.log(filteredData.length);

    console.log(numberOfSelectedData);
  };

  const sortSelectedData = (data: IHistoryItem[]) => {
    let tempSelectedData: IHistoryItem[];
    if (data) {
      tempSelectedData = [...data].reverse();
    }
    setSelectedData(tempSelectedData);
  };

  useEffect(() => {
    sortSelectedData(selectedData ? selectedData : data, selectedSort);
  }, [selectedSort]);

  const clearScannedCertData = async () => {
    try {
      if (data) {
        db.closeAsync();
        db.deleteAsync();
        console.log("Table data cleared successfully");
        setData(null);
        setDistinctCredential_type(null);
        setDistinctIssuer(null);
        setNumberOfResults(0);
        setSelectedData([]);
        setFilter([]);
      }
    } catch (error) {
      console.error("Error clearing table data:", error);
    }
  };

  return (
    <View bg-screenBG className="flex-1 pb-4">
      <View
        bg-screenBG
        className="flex-row border-b-2 border-slate-300 h-[50] justify-between items-center px-4"
      >
        <NumberOfSelectedResults
          selectedButtons={selectedButtons}
          numberOfSelectedData={numberOfSelectedData}
          numberOfResults={numberOfResults}
        />
        <FilterButton
          isDown={isDown}
          setIsDown={setIsDown}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      </View>
      {isVisible && (
        <Filter
          data={filter}
          fontSizeData={fontSizeData}
          onFilter={handleFilter}
          setSort={setSelectedSort}
          selectedSort={selectedSort}
          selectedButtons={selectedButtons}
        />
      )}
      <FlatList
        data={selectedData ? selectedData : data}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <Button
        title={`${t("ClearAllData")}`}
        onPress={() => clearScannedCertData()}
      />
    </View>
  );
}
