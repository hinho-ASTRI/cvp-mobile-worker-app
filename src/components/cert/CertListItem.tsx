import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

const certListItem = ({ item }: { item: any }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const router = useRouter();
  console.log(item);
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
        {"\n"}
        Credential Type: {item.credentialType}
        {"\n"}
        Issuer: {item.issuer}
        {"\n"}
        Valid: {item.isValid.toString()}
      </Text>
      {!item.isValid && (
        <View className="absolute bottom-0 right-0 bg-red-600 px-2 py-1 m-1 rounded-tl-md">
          <Text textColor>Expired</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default certListItem;
