import { ActivityIndicator, View } from "react-native";

const Loading: React.FC = () => {
  return (
    <View className="items-center justify-center flex-row">
      <ActivityIndicator className="mt-4" size="large" color="#999999" />
    </View>
  );
};

export default Loading;
