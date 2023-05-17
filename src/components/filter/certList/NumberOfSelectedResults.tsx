import { Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { TFunction } from "i18next";

type NumberOfSelectedResultsProps = {
  selectedValidButtons: string[];
  selectedCertButtons: string[];
  selectedIssuerButtons: string[];
  dataLength: number;
  numberOfFilteredData: number;
};

const getDisplayText = (
  selectedButtons: string[][],
  dataLength: number,
  numberOfFilteredData: number,
  t: TFunction
) => {
  if (
    selectedButtons.every((buttons: string[]) => buttons.length === 0) ||
    dataLength === 0
  ) {
    return t("No");
  }
  return numberOfFilteredData !== null
    ? numberOfFilteredData === 0
      ? t("No")
      : numberOfFilteredData
    : dataLength;
};

const NumberOfSelectedResults: React.FC<NumberOfSelectedResultsProps> = ({
  selectedValidButtons,
  selectedCertButtons,
  selectedIssuerButtons,
  dataLength,
  numberOfFilteredData,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const { t } = useTranslation();
  const selectedButtons = [
    selectedValidButtons,
    selectedCertButtons,
    selectedIssuerButtons,
  ];
  const displayText = getDisplayText(
    selectedButtons,
    dataLength,
    numberOfFilteredData,
    t
  );
  const displayResult =
    dataLength <= 1 ||
    (numberOfFilteredData !== null && numberOfFilteredData <= 1)
      ? t("Result")
      : t("Results");

  return (
    <Text textColor className={`text-${fontSizeData + 1}xl`}>
      {displayText} {displayResult}
    </Text>
  );
};

export default NumberOfSelectedResults;
