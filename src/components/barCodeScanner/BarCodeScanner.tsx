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
import { useAtomValue } from "jotai";

import {
  validateScannedCert,
  validateScannerUser,
} from "~functions/helper/ajv";
import { CertDetailsFields } from "~functions/api/cert/getCertDetails";
import { WorkerModal } from "~functions/api/worker/getWorkerDetails";
import getTime from "~functions/getTime";
import getWorkerDetails from "~functions/api/worker/getWorkerDetails";
import getCertDetails from "~functions/api/cert/getCertDetails";
import { accessTokenAtom } from "~atoms/accessToken";

const { width } = Dimensions.get("window");

export type InsertCertField = CertDetailsFields & {
  scanned_date: string;
  timeStamp: number;
};

type InsertWorkerField = WorkerModal & {
  scanned_date: string;
  timeStamp: number;
};

export default function BarCodeScan() {
  const accessToken = useAtomValue(accessTokenAtom);

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

    let parsedData: any;
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
