import * as SQLite from "expo-sqlite";
import { View, Text, Button as UiButton } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState, Dispatch } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAtomValue } from "jotai";

import { item } from "~components/Filter";
import Filter from "~components/Filter";
import { fontSizeAtom } from "~atoms/fontSize";
import HistoryItem from "~components/history/HistoryItem";

// type sortBy = "credential_type" | "issuer";
export interface IHistoryItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  issuer: string;
  scanned_date: string;
  start_date: string;
  timeStamp: number;
}

let numberOfResults: number;
let distinctCredential_type: string[];
let distinctIssuer: string[];
let filter: item[];

const fetchData = (db, setData: Dispatch<IHistoryItem[]>) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT COUNT(*) as count FROM scanned_cert_data",
      [],
      (txObj, { rows: { _array } }) => {
        // Only stores up 20 results
        numberOfResults = _array[0].count;
        tx.executeSql(
          "SELECT * FROM scanned_cert_data ORDER BY index_id DESC",
          null,
          (txObj, { rows: { _array } }) => {
            console.log("array");
            setData(_array);

            distinctCredential_type = [
              ...new Set(
                _array.map((item: IHistoryItem) => item.credential_type)
              ),
            ] as string[];
            console.log(distinctCredential_type);

            distinctIssuer = [
              ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
            ] as string[];
            console.log(distinctIssuer);
            if (distinctCredential_type && distinctIssuer) {
              filter = [
                {
                  "Credential Type": distinctCredential_type,
                } as item,
                { Issuer: distinctIssuer } as item,
              ];
              console.log(filter);
            }
          }
        );
      }
    );
  });
};

export default function History() {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const [selectedButtons, setSelectedButtons] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(false);

  const db = SQLite.openDatabase("scanned_cert_data.db");
  const [data, setData] = useState<null | IHistoryItem[]>(null);
  const [isDown, setIsDown] = useState<boolean>(true);

  useEffect(() => fetchData(db, setData), []);

  const handleFilter = (value: number) => {
    let updatedSelectedButtons = [...selectedButtons];
    if (!updatedSelectedButtons.includes(value)) {
      updatedSelectedButtons.push(value);
    } else {
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (item) => item !== value
      );
    }
    setSelectedButtons(updatedSelectedButtons);
  };

  const clearScannedCertData = async (db) => {
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
  console.log(data);

  return (
    <View bg-screenBG className="flex-1 pb-4">
      <View
        bg-screenBG
        className="flex-row border-b-2 border-slate-300 h-[50] justify-between items-center px-4"
      >
        <Text textColor className={`text-${fontSizeData + 1}xl`}>
          {numberOfResults} {numberOfResults > 1 ? "Results" : "Result"}
        </Text>
        <UiButton
          backgroundColor={"#000"}
          label={"Filters"}
          color={"#fff"}
          iconOnRight
          iconSource={() => (
            <View className="ml-2">
              {isDown ? (
                <AntDesign name="caretdown" size={12} color="white" />
              ) : (
                <AntDesign name="caretup" size={12} color="white" />
              )}
            </View>
          )}
          onPress={() => {
            setIsDown(!isDown);
            setIsVisible(!isVisible);
          }}
          borderRadius={15}
        ></UiButton>
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
        data={data}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <Button
        title="Clear Scanned Cert Data"
        onPress={() => clearScannedCertData(db)}
      />
    </View>
  );
}
