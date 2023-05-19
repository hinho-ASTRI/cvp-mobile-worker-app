import { FlatList } from "react-native";
import { View, Button } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";

import { DarkThemeAtom } from "~atoms/darkTheme";
import CertListItem from "./CertListItem";
import NumberOfSelectedResults from "~components/numberOfResults/NumberOfSelectedResults";

type CertListProps = {
  data: any[];
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
  totalItem,
  showLoadMoreButton,
  loadMoreData,
}) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

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
                name="caretdown"
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
        <NumberOfSelectedResults totalItem={totalItem} />
      </View>
      <View className="p-4 mb-12">
        <FlatList
          data={data}
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
