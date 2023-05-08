import * as SQLite from "expo-sqlite";
import { View } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState, Dispatch } from "react";

import HistoryItem from "~components/history/HistoryItem";

export interface IHistoryItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  issuer: string;
  scanned_date: string;
  start_date: string;
  timeStamp: number;
}

const fetchData = (db, setData: Dispatch<IHistoryItem[]>) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM scanned_cert_data ORDER BY index_id DESC",
      null,
      (txObj, { rows: { _array } }) => {
        console.log("array");
        setData(_array);
      }
    );
  });
};

export default function History() {
  const db = SQLite.openDatabase("scanned_cert_data.db");
  const [data, setData] = useState<null | IHistoryItem[]>(null);

  useEffect(() => fetchData(db, setData), []);
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
    <View bg-screenBG className=" flex-1 py-4">
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
