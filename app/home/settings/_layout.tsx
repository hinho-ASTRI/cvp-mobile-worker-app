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
      <Stack.Screen
        name="fontSize"
        options={{ headerTitle: `${t("FontSize")}` }}
      />

      <Stack.Screen
        name="theme"
        options={{
          headerTitle: `${t("DarkMode")}`,
        }}
      />
      <Stack.Screen name="Settings" />
    </Stack>
  );
}
