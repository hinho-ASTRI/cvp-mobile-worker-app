import { Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";

type NumberOfSelectedResultsProps = {
  selectedButtons: any[];
  numberOfSelectedData: number;
  numberOfResults: number;
};

const NumberOfSelectedResults: React.FC<NumberOfSelectedResultsProps> = ({
  selectedButtons,
  numberOfSelectedData,
  numberOfResults,
}) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const { t } = useTranslation();

  return (
    <Text textColor className={`text-${fontSizeData + 1}xl`}>
      {selectedButtons.length === 0
        ? `${t("No")}`
        : numberOfSelectedData
        ? numberOfSelectedData
        : numberOfResults
        ? numberOfResults
        : `${t("No")}`}{" "}
      {selectedButtons.length === 0 || numberOfResults <= 1
        ? `${t("Result")}`
        : numberOfSelectedData && numberOfSelectedData <= 1
        ? `${t("Result")}`
        : `${t("Results")}`}
    </Text>
  );
};

export default NumberOfSelectedResults;
