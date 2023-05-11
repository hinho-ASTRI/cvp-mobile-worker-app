import { Text, View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import QrCode from "~components/qrCode/qrCode";
import { usernameAtom } from "~atoms/username";

export default function Profile() {
  const { t } = useTranslation();
  const usernameData = useAtomValue(usernameAtom);

  return (
    <View bg-screenBG centerH className=" flex-1 py-4">
      <Text textColor className="text-2xl mb-4">
        {`${t("UsernamePlaceholder")}`}: {usernameData}
      </Text>
      <QrCode
        size={250}
        value={{
          username: usernameData,
        }}
      />
    </View>
  );
}
