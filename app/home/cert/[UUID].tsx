import { useSearchParams } from "expo-router";
import { View } from "react-native";

import QrCode from "~components/qrCode/qrCode";
import CertListItemDetails from "~components/cert/CertListItemDetails";

const CertListID: React.FC = () => {
  const params = useSearchParams();
  const UUID = params.UUID as string;

  console.log(UUID);
  return (
    <View className="justify-center items-center">
      {/* <CertListItemDetails id={id} /> */}
      <QrCode size={200} value={{ UUID }} />
    </View>
  );
};

export default CertListID;
