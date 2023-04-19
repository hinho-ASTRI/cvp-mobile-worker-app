import { Text, Pressable } from "react-native";
import { ListItem } from "~components/functions/getCertIds";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

const certListItem = ({ item }: { item: ListItem }) => {
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);

  const router = useRouter();

  return (
    <Pressable
      className="border-[#ccc] my-2 mx-2 p-1.5 rounded border"
      onPress={() => {
        router.push({
          pathname: `/home/cert/${item.id}`,
        });
        console.log(item.id);
      }}
    >
      <Text className={`text-${fontSizeData + 1}xl`}>{item.value}</Text>
    </Pressable>
  );
};

export default certListItem;
