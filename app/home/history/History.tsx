import * as SQLite from "expo-sqlite";
import { View, Text } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

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
  const [selectedButtons, setSelectedButtons] = useState<any>([]);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM scanned_cert_data",
        [],
        (txObj, { rows: { _array } }) => {
          // Only stores up 20 results
          setNumberOfResults(_array[0].count);
          tx.executeSql(
            "SELECT * FROM scanned_cert_data ORDER BY index_id DESC",
            null,
            (txObj, { rows: { _array } }) => {
              console.log("array");
              const tempDistinctCredentialType = [
                ...new Set(
                  _array.map((item: IHistoryItem) => item.credential_type)
                ),
              ].sort();
              const tempDistinctIssuer = [
                ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
              ].sort();

              setData(_array);
              setDistinctCredential_type(
                [
                  ...new Set(
                    _array.map((item: IHistoryItem) => item.credential_type)
                  ),
                ].sort()
              );
              console.log(
                "distinctCredential_type",
                tempDistinctCredentialType
              );
              setDistinctIssuer(
                [
                  ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
                ].sort()
              );
              console.log("distinctIssuer", tempDistinctIssuer);
              if (tempDistinctCredentialType && tempDistinctIssuer) {
                setFilter([
                  {
                    "Credential Type": tempDistinctCredentialType,
                  } as item,
                  { Issuer: tempDistinctIssuer } as item,
                ]);

                setSelectedButtons([
                  ...tempDistinctCredentialType,
                  ...tempDistinctIssuer,
                ]);
              }
            }
          );
        }
      );
    });
  };

  useEffect(() => fetchData(), []);

  const handleFilter = (value: number) => {
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

  const clearScannedCertData = async () => {
    try {
      if (data) {
        db.closeAsync();
        db.deleteAsync();
        setData(null);
        console.log("Table data cleared successfully");
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
        <Text textColor className={`text-${fontSizeData + 1}xl`}>
          {selectedButtons.length === 0
            ? `${t("No")}`
            : numberOfSelectedData
            ? numberOfSelectedData
            : numberOfResults
            ? numberOfResults
            : `${t("No")}`}{" "}
          {selectedButtons.length === 0 || numberOfResults <= 1
            ? `${t("Result")}`
            : numberOfSelectedData && numberOfSelectedData <= 1
            ? `${t("Result")}`
            : `${t("Results")}`}
        </Text>
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
