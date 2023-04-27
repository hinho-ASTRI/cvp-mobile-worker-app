import { FlatList, View } from "react-native";

import CertListItem from "./CertListItem";
import { ListItem } from "~functions/getCertIds";

type CertListProprs = {
  data: ListItem[];
};

const CertList: React.FC<CertListProprs> = ({ data }) => {
  return (
    <View className="flex-1 p-4">
      <FlatList
        data={data}
        renderItem={({ item }) => <CertListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CertList;
