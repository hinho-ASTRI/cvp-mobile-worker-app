import * as SQLite from "expo-sqlite";
import { TouchableOpacity, View, Text } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState, Dispatch } from "react";
import CertListItem from "~components/cert/CertListItem";
// const db = SQLite.openDatabase("scanned_cert_data.db");

interface scanResult {
  id: string;
  timeStamp: number;
  date: string;
}

const fetchData = (db, setData: Dispatch<any[]>) => {
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

const renderItem = ({ item }) => (
  <TouchableOpacity
    bg-screenBG
    center
    className="border-[#ccc] my-2 mx-2 p-3.5 rounded border"
  >
    <Text textColor>ID: {item.id}</Text>
    <Text textColor>{item.date}</Text>
  </TouchableOpacity>
);

export default function History() {
  const db = SQLite.openDatabase("scanned_cert_data.db");
  const [data, setData] = useState<null | any[]>(null);

  useEffect(() => fetchData(db, setData), []);
  console.log(data);

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

  return (
    <View bg-screenBG className=" flex-1 py-4">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>

      <Button
        title="Clear Scanned Cert Data"
        onPress={() => clearScannedCertData(db)}
      />
    </View>
  );
}
