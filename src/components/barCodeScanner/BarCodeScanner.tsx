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

const { width } = Dimensions.get("window");
export default function BarCodeScan() {
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
    Alert.alert(
      `${t("ScannedResult")}`,
      `\n${t("UsernamePlaceholder")}: ${data}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
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
