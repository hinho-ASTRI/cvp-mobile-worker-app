import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAtomValue } from "jotai";

import getTime from "~functions/getTime";
import { DarkThemeAtom } from "~atoms/darkTheme";

type QrCodeProps = {
  size: number;
  value: { username: string } | { id: string };
};

export const QrCode: React.FC<QrCodeProps> = ({ size, value }) => {
  const [timeStamp, setTimestamp] = useState<number>(null);
  const [dateFormat, setDateFormat] = useState<string>("");

  const isDarkTheme = useAtomValue(DarkThemeAtom);

  useEffect(() => {
    getTime(setTimestamp, setDateFormat);
    const interval = setInterval(() => {
      getTime(setTimestamp, setDateFormat);
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="my-4">
      <QRCode
        backgroundColor={isDarkTheme ? "black" : "white"}
        color={isDarkTheme ? "white" : "black"}
        size={size}
        value={JSON.stringify({
          ...value,
          timeStamp: timeStamp,
          date: dateFormat,
        })}
      />
    </View>
  );
};

export default QrCode;
