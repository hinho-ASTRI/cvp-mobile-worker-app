import { useSearchParams } from "expo-router";
import { View } from "react-native";
import { TouchableOpacity, Text } from "react-native-ui-lib";
import { useState } from "react";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

import QrCode from "~components/qrCode/qrCode";

const CertIDPage: React.FC = () => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const params = useSearchParams();

  const UUID = params.UUID as string;
  const isValid = params.isValid as string;
  const credentialType = params.credentialType as string;
  const issuer = params.issuer as string;

  console.log(isValid);
  const [showText, setShowText] = useState(false);

  const handleLongPress = () => {
    setShowText(true);
  };

  const handlePressOut = () => {
    setShowText(false);
  };
  console.log(UUID);
  return (
    <>
      <View className="justify-center items-center">
        <QrCode size={250} value={{ UUID }} />
      </View>
      <View className="flex-row justify-end m-4">
        {/* <TouchableOpacity
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
        >
          <Text textColor className={`text-${fontSizeData + 1}xl`}>
            Press and hold me to show details
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* {showText && (
        <Text textColor className={`text-${fontSizeData + 1}xl my-16 ml-4`}>
          UUID: {UUID}
          {"\n"}
          Credential Type: {credentialType}
          {"\n"}
          Issuer: {issuer}
          {"\n"}
          Valid: {isValid}
          {"\n"}
        </Text> */}
      {/* )} */}
    </>
  );
};

export default CertIDPage;
