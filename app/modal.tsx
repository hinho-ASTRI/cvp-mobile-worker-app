import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <View className="bg-neutral-700 flex-1 items-center p-12">
      <Text className=" text-xl my-4 text-white">
        This is the Star-Wars API!
      </Text>
      <Text
        className="text-white text-xl"
        onPress={() => {
          router.back();
        }}
      >
        Dismiss
      </Text>
    </View>
  );
}
