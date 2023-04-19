import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: `${t("Settings")}` }}
      />
      <Stack.Screen
        name="language"
        options={{ headerTitle: `${t("Language")}` }}
      />
      <Stack.Screen name="font" options={{ headerTitle: `${t("FontSize")}` }} />
      <Stack.Screen name="Settings" />
    </Stack>
  );
}
