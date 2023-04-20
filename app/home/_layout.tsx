import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons/";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";
import TabBarIcon from "~components/tabBarIcon/tabBarIcon";

export default function Layout1() {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? "white" : "black",
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "black" : "white",
        },
      }}
    >
      <Tabs.Screen
        name="cert"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <FontAwesome name="home" size={focused ? 28 : 24} color={color} />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="BarCodeScanner"
        options={{
          href: "home/BarCodeScanner",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <MaterialIcons
                name="qr-code-scanner"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerTitle: `${t("QRCodeScanner")}`,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Ionicons
                name="settings-sharp"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
