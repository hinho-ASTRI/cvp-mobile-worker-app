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
import { useAtomValue } from "jotai";
import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/core";

import { CertDetailsFields } from "~functions/api/cert/getCertDetails";
import { WorkerModal } from "~functions/api/worker/getWorkerDetails";
import getTime from "~functions/getTime";
import getWorkerDetails from "~functions/api/worker/getWorkerDetails";
import getCertDetails from "~functions/api/cert/getCertDetails";
import { accessTokenAtom } from "~atoms/accessToken";

const { width } = Dimensions.get("window");
const db = SQLite.openDatabase("scanned_cert_data.db");

const ajv = new Ajv({ allErrors: true });
const ajv1 = new Ajv({ allErrors: true });

const ScannedCertFieldSchema = {
  type: "object",
  properties: {
    UUID: { type: "string" },
    date: { type: "string" },
    timeStamp: { type: "integer" },
  },
  required: ["UUID", "date", "timeStamp"],
  additionalProperties: false,
} as const;

const ScannedWorkerFieldSchema = {
  type: "object",
  properties: {
    date: { type: "string" },
    timeStamp: { type: "integer" },
    username: { type: "string" },
  },
  required: ["date", "timeStamp", "username"],
  additionalProperties: false,
} as const;

type ScannedCertField = JTDDataType<typeof ScannedCertFieldSchema>;
type ScannedWorkerField = JTDDataType<typeof ScannedWorkerFieldSchema>;

const validateScannedCert = ajv.compile<ScannedCertField>(
  ScannedCertFieldSchema
);
const validateScannerUser = ajv1.compile<ScannedWorkerField>(
  ScannedWorkerFieldSchema
);

type InsertCertField = CertDetailsFields & {
  scanned_date: string;
  timeStamp: number;
};

type InsertWorkerField = WorkerModal & {
  scanned_date: string;
  timeStamp: number;
};

export default function BarCodeScan() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists scanned_cert_data (index_id INTEGER PRIMARY KEY AUTOINCREMENT, UUID INTEGER, credential_type text, end_date text, extra text, is_valid INTEGER, issuer text, start_date text, worker_signature text, scanned_date text, timeStamp INTEGER);"
      );
    });
  }, []);

  const accessToken = useAtomValue(accessTokenAtom);

  const insertScannedData = (data: InsertCertField) => {
    console.log("in insert data function", data);

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
        "INSERT INTO scanned_cert_data (UUID, credential_type, end_date, extra, is_valid, issuer ,worker_signature, start_date, scanned_date, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.UUID,
          data.credential_type,
          data.end_date,
          data.extra,
          //1 for true and 0 for false
          Number(data.is_valid),
          data.issuer,
          data.worker_signature,
          data.start_date,
          data.scanned_date,
          data.timeStamp,
        ],
        (_, result) => console.log("Data inserted successfully"),
        (_, error) => {
          console.log("Error inserting data:", error);
          return false;
        }
      );
    });
  };

  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    const timeObj = getTime();
    const currentTime = timeObj.currentTime;

    // const parsedData = JSON.parse(data);
    let parsedData;
    let isValidJson: boolean = false;
    try {
      parsedData = JSON.parse(data);
      isValidJson = true;
    } catch (error) {
      isValidJson = false;
    }
    console.log("Scanned data:", data);
    console.log("parsedData", parsedData);

    // QR code checking
    // Check if the scanned QR code has expired (i.e. produced more than 1 minute ago)
    // console.log((currentTime - parsedData.timeStamp) / 1000);
    if (!isValidJson) {
      console.log("Scanned data is not a JSON object");
      Alert.alert("Error", "Invalid data format", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (validateScannedCert(parsedData)) {
      const timeStamp = parsedData.timeStamp as number;
      if (currentTime - timeStamp > 60000) {
        Alert.alert("Error", "The QR Code has expired", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      const fetchData = async () => {
        try {
          const data = await getCertDetails(parsedData.UUID, accessToken);
          if (data) {
            Alert.alert(
              `${t("ScannedResult")}`,
              `UUID: ${data.UUID}\n Credential Type: ${data.credential_type}\n Start Date: ${data.start_date}\n End Date: ${data.end_date}\n Is Valid: ${data.is_valid}\n Issuer: ${data.issuer}`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            const combinedData: InsertCertField = {
              ...data,
              scanned_date: timeObj.date,
              timeStamp: currentTime,
            };
            console.log("combinedData", combinedData);

            insertScannedData(combinedData);
          }
        } catch (e) {
          console.log("error:", e);
        }
      };
      fetchData();
      console.log("scanned", data);
    } else if (validateScannerUser(parsedData)) {
      const timeStamp = parsedData.timeStamp as number;
      if (currentTime - timeStamp > 60000) {
        Alert.alert("Error", "The QR Code has expired", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      const fetchData = async () => {
        try {
          const data = await getWorkerDetails(parsedData.username, accessToken);
          if (data) {
            Alert.alert(
              `${t("ScannedResult")}`,
              `ID: ${data.id}\n Name: ${data.name}\n Gender: ${data.gender}\n HKID: ${data.hkid}`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            const combinedData: InsertWorkerField = {
              ...data,
              scanned_date: timeObj.date,
              timeStamp: currentTime,
            };
            console.log("combinedData", combinedData);
          }
        } catch (e) {
          console.log("error:", e);
        }
      };
      fetchData();
      console.log("scanned", data);
    } else {
      Alert.alert("Error", "Invalid data format", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
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
