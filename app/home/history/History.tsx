import * as SQLite from "expo-sqlite";
import { View } from "react-native-ui-lib";
import { FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import fetchScannedData from "~functions/sqlite/fetchScannedData";
import NumberOfSelectedResults from "~components/filter/history/NumberOfSelectedResults";
import FilterButton from "~components/filter/FilterButton";
import { item } from "~components/filter/history/Filter";
import Filter from "~components/filter/history/Filter";
import HistoryItem from "~components/history/HistoryItem";

export interface IHistoryItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  extra: any;
  is_valid: number;
  issuer: string;
  start_date: string;
  worker_signature: string;
  scanned_date: string;
  timeStamp: number;
}

type MappingType = {
  credentialType: string[];
  issuer: string[];
  valid: boolean[];
};

export default function History() {
  const { t } = useTranslation();

  const db = SQLite.openDatabase("scanned_cert_data.db");

  const [isVisible, setIsVisible] = useState(false);
  const [isDown, setIsDown] = useState<boolean>(true);
  const [data, setData] = useState<null | IHistoryItem[]>(null);
  const [numberOfResults, setNumberOfResults] = useState<null | number>(null);

  // filter
  const [distinctCredential_type, setDistinctCredential_type] = useState<
    string[]
  >([]);
  const [distinctIssuer, setDistinctIssuer] = useState<string[]>([]);
  const [filter, setFilter] = useState<item[]>([]);
  const [selectedData, setSelectedData] = useState<null | IHistoryItem[]>(null);
  const [numberOfSelectedData, setNumberOfSelectedData] = useState<
    null | number
  >(null);
  const [selectedButtons, setSelectedButtons] = useState<any[]>([]);

  //sort
  const [selectedSort, setSelectedSort] = useState<string>("Date: New to Old");
  const [selectedCred, setSelectedCred] = useState<string[]>([]);
  const [selectedIssuer, setSelectedIssuer] = useState<string[]>([]);
  const [selectedValidButton, setSelectedValidButton] = useState<string[]>([]);

  const [selectedValid, setSelectedValid] = useState<string[]>([
    "Valid",
    "Not Valid",
  ]);

  useEffect(() => {
    fetchScannedData(
      db,
      setNumberOfResults,
      setData,
      setDistinctCredential_type,
      setDistinctIssuer,
      setFilter,
      setSelectedButtons,
      selectedValid,
      setSelectedCred,
      setSelectedIssuer,
      setSelectedValidButton
    );
  }, []);

  const handleFilter = (value: string) => {
    let updatedSelectedButtons = [...selectedButtons];

    let updatedSelectedIssuer = [...selectedIssuer];
    let updatedSelectedValidButton = [...selectedValidButton];
    let updatedSelectedCred = [...selectedCred];
    if (distinctCredential_type.includes(value)) {
      console.log(value);

      if (!updatedSelectedCred.includes(value)) {
        updatedSelectedCred.push(value);
      } else {
        updatedSelectedCred = updatedSelectedCred.filter(
          (item) => item !== value
        );
      }
      setSelectedCred(updatedSelectedCred);
      console.log("updatedSelectedCred", updatedSelectedCred);
    }

    if (distinctIssuer.includes(value)) {
      if (!updatedSelectedIssuer.includes(value)) {
        updatedSelectedIssuer.push(value);
      } else {
        updatedSelectedIssuer = updatedSelectedIssuer.filter(
          (item) => item !== value
        );
      }
      setSelectedIssuer(updatedSelectedIssuer);
    }
    if (["Valid", "Not Valid"].includes(value)) {
      if (!updatedSelectedValidButton.includes(value)) {
        updatedSelectedValidButton.push(value);
      } else {
        updatedSelectedValidButton = updatedSelectedValidButton.filter(
          (item) => item !== value
        );
      }
      setSelectedValidButton(updatedSelectedValidButton);
    }
    if (!updatedSelectedButtons.includes(value)) {
      updatedSelectedButtons.push(value);
    } else {
      updatedSelectedButtons = updatedSelectedButtons.filter(
        (item) => item !== value
      );
    }
    // The pressed filter button
    setSelectedButtons(updatedSelectedButtons);
    const filteredData = data.filter(
      (item) =>
        (updatedSelectedCred.length === 0 ||
          updatedSelectedCred.includes(item.credential_type)) &&
        (updatedSelectedValidButton.length === 0 ||
          updatedSelectedValidButton.includes(
            item.is_valid === 0 ? "Not Valid" : "Valid"
          )) &&
        (updatedSelectedIssuer.length === 0 ||
          updatedSelectedIssuer.includes(item.issuer))
    );

    setSelectedData(filteredData);
    setNumberOfSelectedData(filteredData.length);
  };

  const validHandler = (value: string) => {
    let updatedValidButtons = [...selectedValid];

    if (!updatedValidButtons.includes(value)) {
      updatedValidButtons.push(value);
    } else {
      updatedValidButtons = updatedValidButtons.filter(
        (item) => item !== value
      );
    }
    if (value in distinctCredential_type) {
      let updatedSelectedCred = [...selectedCred];

      if (!updatedSelectedCred.includes(value)) {
        updatedSelectedCred.push(value);
      } else {
        updatedSelectedCred = updatedSelectedCred.filter(
          (item) => item !== value
        );
      }
      setSelectedCred(updatedSelectedCred);
    }
    if (value in distinctIssuer) {
      let updatedSelectedIssuer = [...selectedIssuer];

      if (!updatedSelectedIssuer.includes(value)) {
        updatedSelectedIssuer.push(value);
      } else {
        updatedSelectedIssuer = updatedSelectedIssuer.filter(
          (item) => item !== value
        );
      }
      setSelectedIssuer(updatedSelectedIssuer);
    }
    if (value in ["Valid", "Not Valid"]) {
      let updatedSelectedValidButton = [...selectedValidButton];

      if (!updatedSelectedValidButton.includes(value)) {
        updatedSelectedValidButton.push(value);
      } else {
        updatedSelectedValidButton = updatedSelectedValidButton.filter(
          (item) => item !== value
        );
      }
      setSelectedValidButton(updatedSelectedValidButton);
    }
    console.log(updatedValidButtons);
    // The pressed filter button
    setSelectedValid(updatedValidButtons);
  };
  const sortSelectedData = (data: IHistoryItem[]) => {
    let tempSelectedData: IHistoryItem[];
    if (data) {
      tempSelectedData = [...data].reverse();
    }
    setSelectedData(tempSelectedData);
  };

  useEffect(() => {
    sortSelectedData(selectedData ? selectedData : data);
  }, [selectedSort]);

  const clearScannedCertData = async () => {
    try {
      if (data) {
        db.closeAsync();
        db.deleteAsync();
        console.log("Table data cleared successfully");
        setData(null);
        setDistinctCredential_type(null);
        setDistinctIssuer(null);
        setNumberOfResults(0);
        setSelectedData([]);
        setFilter([]);
      }
    } catch (error) {
      console.error("Error clearing table data:", error);
    }
  };

  return (
    <View bg-screenBG className="flex-1 pb-4">
      <View
        bg-screenBG
        className="flex-row border-b-2 border-slate-300 h-[50] justify-between items-center px-4"
      >
        <NumberOfSelectedResults
          selectedButtons={selectedButtons}
          numberOfSelectedData={numberOfSelectedData}
          numberOfResults={numberOfResults}
        />
        <FilterButton
          isDown={isDown}
          setIsDown={setIsDown}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      </View>
      {isVisible && (
        <Filter
          data={filter}
          onFilter={handleFilter}
          setSort={setSelectedSort}
          selectedSort={selectedSort}
          selectedButtons={selectedButtons}
          selectedValid={selectedValid}
          setSelectedValid={setSelectedValid}
        />
      )}
      <FlatList
        data={selectedData ? selectedData : data}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <Button
        title={`${t("ClearAllData")}`}
        onPress={() => clearScannedCertData()}
      />
    </View>
  );
}
