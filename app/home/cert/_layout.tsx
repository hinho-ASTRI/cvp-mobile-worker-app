import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: `${t("CertList")}` }}
      />
      <Stack.Screen name="CertListPage" />
      <Stack.Screen name="[id]" options={{ headerTitle: `${t("CertInfo")}` }} />
    </Stack>
  );
}
