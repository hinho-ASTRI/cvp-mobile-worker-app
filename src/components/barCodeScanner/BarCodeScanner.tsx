import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import * as SQLite from "expo-sqlite";

const { width } = Dimensions.get("window");
const db = SQLite.openDatabase("scanned_cert_data.db");
interface scanResult {
  id: string;
  timeStamp: number;
  date: string;
}

export default function BarCodeScan() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists scanned_cert_data (index_id INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, timeStamp INTEGER, date text);"
      );
    });
  }, []);

  const insertScannedData = (data: scanResult) => {
    db.transaction((tx) => {
      // Check the number of rows
      tx.executeSql(
        "SELECT COUNT(*) as count FROM scanned_cert_data",
        [],
        (txObj, { rows: { _array } }) => {
          // Only stores up 20 results
          if (_array[0].count >= 20) {
            // Delete the oldest row
            tx.executeSql(
              "DELETE FROM scanned_cert_data WHERE index_id = (SELECT MIN(index_id) FROM scanned_cert_data)",
              [],
              () => {
                console.log("Oldest row deleted");
              }
            );
          }
        }
      );

      // Insert the new data
      tx.executeSql(
        "INSERT INTO scanned_cert_data (id, timeStamp, date) VALUES (?, ?, ?)",
        [data.id, data.timeStamp, data.date],
        (_, result) => console.log("Data inserted successfully")
      );
    });
  };

  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Scanner data:", data);
    insertScannedData(JSON.parse(data));

    Alert.alert(`${t("ScannedResult")}`, `${data}`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  // TODO: translation
  if (hasPermission === null) {
    return (
      <View className="justify-center items-center">
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 justify-center">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask width={width * 0.8} height={width * 0.8} />
      </BarCodeScanner>
      {scanned && (
        <Button
          title={`${t("TapToScanAgain")}`}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}
