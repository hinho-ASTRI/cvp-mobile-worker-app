import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

type CertListItemProps = {
  id: string;
};

const CertListItemDetails: React.FC<CertListItemProps> = (props) => {
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);

  const { t } = useTranslation();

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Text className={`text-${fontSizeData + 1}xl`}>
        {`${t("CertList")}`}: {props.id}
      </Text>
    </View>
  );
};

export default CertListItemDetails;
