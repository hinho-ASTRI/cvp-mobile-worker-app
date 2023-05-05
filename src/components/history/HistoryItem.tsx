import { TouchableOpacity, Text } from "react-native-ui-lib";

type HistoryItemProps = {
  item: { id: string; timeStamp: number; date: string };
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => (
  <TouchableOpacity
    bg-screenBG
    center
    className="border-[#ccc] my-2 mx-2 p-3.5 rounded border"
  >
    <Text textColor>ID: {item.id}</Text>
    <Text textColor>{item.date}</Text>
  </TouchableOpacity>
);

export default HistoryItem;
