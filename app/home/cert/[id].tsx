import { useSearchParams } from "expo-router";
import { View } from "react-native";

import QrCode from "~components/qrCode/qrCode";
import CertListItemDetails from "~components/cert/CertListItemDetails";

const CertListID: React.FC = () => {
  const params = useSearchParams();
  const id = params.id as string;
  console.log(id);
  return (
    <View className="justify-center items-center">
      <CertListItemDetails id={id} />
      <QrCode size={200} value={{ id: id }} />
    </View>
  );
};

export default CertListID;
