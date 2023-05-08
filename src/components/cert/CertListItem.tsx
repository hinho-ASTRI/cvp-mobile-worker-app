import { Text, TouchableOpacity } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";

import { ListItem } from "~functions/getCertIds";
import { fontSizeAtom } from "~atoms/fontSize";

const certListItem = ({ item }: { item: ListItem }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const router = useRouter();

  return (
    <TouchableOpacity
      bg-screenBG
      className="border-[#ccc] my-2 mx-2 p-1.5 rounded border"
      onPress={() => {
        router.push({
          pathname: `/home/cert/${item.value}`,
        });
        console.log(item.id);
      }}
    >
      <Text textColor className={`text-${fontSizeData + 1}xl `}>
        {item.value}
      </Text>
    </TouchableOpacity>
  );
};

export default certListItem;
