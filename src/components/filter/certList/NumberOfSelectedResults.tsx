import { Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";

type NumberOfSelectedResultsProps = {
  selectedValid: string[];
  dataLength: number;
  numberOfFilteredData: number;
};

const NumberOfSelectedResults: React.FC<NumberOfSelectedResultsProps> = ({
  selectedValid,
  dataLength,
  numberOfFilteredData,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const { t } = useTranslation();

  return (
    <Text textColor className={`text-${fontSizeData + 1}xl`}>
      {selectedValid.length === 0 || dataLength === 0
        ? `${t("No")}`
        : numberOfFilteredData !== null
        ? numberOfFilteredData === 0
          ? `${t("No")}`
          : numberOfFilteredData
        : dataLength}{" "}
      {selectedValid.length === 0 || dataLength <= 1
        ? `${t("Result")}`
        : numberOfFilteredData !== null && numberOfFilteredData <= 1
        ? `${t("Result")}`
        : `${t("Results")}`}
    </Text>
  );
};

export default NumberOfSelectedResults;
