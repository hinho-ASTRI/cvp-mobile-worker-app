import { TouchableOpacity, Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

type HistoryItemProps = {
  item: {
    UUID: string;
    credential_type: string;
    end_date: string;
    extra: string;
    is_valid: number;
    issuer: string;
    start_date: string;
    worker_signature: string;
    scanned_date: string;
    timeStamp: number;
  };
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  return (
    // red-border = not valid, green-border = valid
    <TouchableOpacity
      bg-screenBG
      center
      className={`${
        item.is_valid === 0 ? "border-[#ff0b0b]" : "border-[#24ff07]"
      } my-2 mx-2 p-3.5 rounded border`}
    >
      <Text textColor className={`text-${fontSizeData + 1}xl`}>
        {item.UUID}
      </Text>
      <Text textColor className={`text-${fontSizeData + 1}xl`}>
        {item.scanned_date}
      </Text>
    </TouchableOpacity>
  );
};

export default HistoryItem;
