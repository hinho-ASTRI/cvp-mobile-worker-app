import { FlatList } from "react-native";
import { View, Button, Text } from "react-native-ui-lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";

import { DarkThemeAtom } from "~atoms/darkTheme";
import CertListItem from "./CertListItem";
import FilterButton from "~components/filter/FilterButton";
import FilterForCertList from "~components/filter/certList/FilterForCertList";
import NumberOfSelectedResults from "~components/filter/certList/NumberOfSelectedResults";

type CertListProps = {
  data: any[];
  distinctCredentialType: any[];
  distinctIssuer: any[];
  totalItem: number;
  showLoadMoreButton: boolean;
  loadMoreData: () => void;
};

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type FilterFieldsProps =
  | Pick<fields, "Credential Type" | "Issuer">
  | { Valid: ["Valid", "Not Valid"] };

const CertList: React.FC<CertListProps> = ({
  data,
  distinctCredentialType,
  distinctIssuer,
  totalItem,
  showLoadMoreButton,
  loadMoreData,
}) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const { t } = useTranslation();
  const [isDown, setIsDown] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any[] | null>(null);

  const [numberOfFilteredData, setNumberOfFilteredData] =
    useState<number>(null);
  const [selectedCred, setSelectedCred] = useState<string[]>(
    distinctCredentialType
  );
  const [selectedIssuer, setSelectedIssuer] =
    useState<string[]>(distinctIssuer);
  const [selectedValidButton, setSelectedValidButton] = useState<string[]>([
    "Valid",
    "Not Valid",
  ]);

  const filterFields: FilterFieldsProps[] = [
    { Valid: ["Valid", "Not Valid"] },
    {
      "Credential Type": distinctCredentialType,
    } as FilterFieldsProps,
    { Issuer: distinctIssuer } as FilterFieldsProps,
  ];

  const handleFilter = (value: string) => {
    const updatedValues = {
      selectedIssuer: [...selectedIssuer],
      selectedValidButton: [...selectedValidButton],
      selectedCred: [...selectedCred],
    };

    const updateSelected = (key: keyof typeof updatedValues, value: string) => {
      if (!updatedValues[key].includes(value)) {
        updatedValues[key].push(value);
      } else {
        updatedValues[key] = updatedValues[key].filter(
          (item) => item !== value
        );
      }
    };

    if (distinctCredentialType.includes(value)) {
      updateSelected("selectedCred", value);
    } else if (distinctIssuer.includes(value)) {
      updateSelected("selectedIssuer", value);
    } else if (["Valid", "Not Valid"].includes(value)) {
      updateSelected("selectedValidButton", value);
    }

    setSelectedCred(updatedValues.selectedCred);
    setSelectedIssuer(updatedValues.selectedIssuer);
    setSelectedValidButton(updatedValues.selectedValidButton);

    const filteredData = data.filter(
      (item) =>
        (updatedValues.selectedCred.length === 0 ||
          updatedValues.selectedCred.includes(item.credentialType)) &&
        (updatedValues.selectedValidButton.length === 0 ||
          updatedValues.selectedValidButton.includes(
            item.isValid ? "Valid" : "Not Valid"
          )) &&
        (updatedValues.selectedIssuer.length === 0 ||
          updatedValues.selectedIssuer.includes(item.issuer))
    );
    if (
      updatedValues.selectedCred.length === 0 &&
      updatedValues.selectedIssuer.length === 0 &&
      updatedValues.selectedValidButton.length === 0
    ) {
      setFilteredData([]);
      setNumberOfFilteredData(0);
    } else {
      setFilteredData(filteredData);
      setNumberOfFilteredData(filteredData.length);
    }
  };

  const renderFooter = () => {
    return (
      <View>
        <Button
          bg-textColor
          label="Load More"
          screenBG
          iconOnRight
          iconSource={() => (
            <View className="ml-2">
              <AntDesign
                name={isDown ? "caretdown" : "caretup"}
                size={12}
                color={`${isDarkTheme ? "black" : "white"}`}
              />
            </View>
          )}
          onPress={loadMoreData}
        ></Button>
      </View>
    );
  };

  return (
    <>
      <View
        bg-screenBG
        className="flex-row border-b-2 border-slate-300 h-[50] items-center justify-between px-4"
      >
        <NumberOfSelectedResults
          selectedValidButtons={selectedValidButton}
          selectedCertButtons={selectedCred}
          selectedIssuerButtons={selectedIssuer}
          totalItem={totalItem}
          numberOfFilteredData={numberOfFilteredData}
        />
        {/* <FilterButton
          isDown={isDown}
          setIsDown={setIsDown}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        /> */}
      </View>
      {isVisible && (
        <FilterForCertList
          filterFields={filterFields}
          onFilter={handleFilter}
          selectedValidButtons={selectedValidButton}
          selectedCertButtons={selectedCred}
          selectedIssuerButtons={selectedIssuer}
        />
      )}
      <View className="p-4 mb-12">
        <FlatList
          data={filteredData ? filteredData : data}
          renderItem={({ item }) => <CertListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() =>
            showLoadMoreButton ? renderFooter() : null
          }
        />
      </View>
    </>
  );
};

export default CertList;
