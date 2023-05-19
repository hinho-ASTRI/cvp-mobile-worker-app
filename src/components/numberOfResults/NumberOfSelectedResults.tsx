import { Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";

type NumberOfSelectedResultsProps = {
  totalItem: number;
};

const NumberOfSelectedResults: React.FC<NumberOfSelectedResultsProps> = ({
  totalItem,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const { t } = useTranslation();

  return (
    <Text textColor className={`text-${fontSizeData + 1}xl`}>
      {totalItem} {totalItem <= 1 ? t("Result") : t("Results")}
    </Text>
  );
};

export default NumberOfSelectedResults;
