import * as SQLite from "expo-sqlite";
import { View } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState, Dispatch } from "react";

import HistoryItem from "~components/history/HistoryItem";

type sortBy = "credential_type" | "issuer";

export interface IHistoryItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  issuer: string;
  scanned_date: string;
  start_date: string;
  timeStamp: number;
}

let distinctCredential_type: string[];
let distinctIssuer: string[];

const fetchData = (db, setData: Dispatch<IHistoryItem[]>) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM scanned_cert_data ORDER BY index_id DESC",
      null,
      (txObj, { rows: { _array } }) => {
        console.log("array");
        setData(_array);

        distinctCredential_type = [
          ...new Set(_array.map((item: IHistoryItem) => item.credential_type)),
        ] as string[];
        console.log(distinctCredential_type);

        distinctIssuer = [
          ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
        ] as string[];
        console.log(distinctIssuer);
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
    <View bg-screenBG className="flex-1 py-4">
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
