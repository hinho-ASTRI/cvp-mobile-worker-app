import { Text, TouchableOpacity } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

const certListItem = ({ item }: { item: any }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const router = useRouter();

  return (
    <TouchableOpacity
      bg-screenBG
      className={`${
        item.isValid ? null : "bg-[#666666]"
      } border-[#ccc] my-2 mx-2 p-1.5 rounded border`}
      onPress={() => {
        router.push({
          pathname: `/home/cert/${item.UUID}`,
        });
      }}
    >
      <Text
        textColor
        className={`${item.isValid ? null : "opacity-60"} text-${
          fontSizeData + 1
        }xl `}
      >
        {item.UUID}
      </Text>
    </TouchableOpacity>
  );
};
export default certListItem;
