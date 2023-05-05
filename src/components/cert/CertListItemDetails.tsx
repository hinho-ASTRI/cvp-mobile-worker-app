import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { Text } from "react-native-ui-lib";

import { fontSizeAtom } from "~atoms/fontSize";

type CertListItemProps = {
  id: string;
};

const CertListItemDetails: React.FC<CertListItemProps> = (props) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const { t } = useTranslation();

  return (
    <Text textColor className={`text-${fontSizeData + 1}xl `}>
      {`${t("CertList")}`}: {props.id}
    </Text>
  );
};

export default CertListItemDetails;
