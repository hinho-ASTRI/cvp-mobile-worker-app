import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons/";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { usernameAtom } from "~atoms/username";
import { DarkThemeAtom } from "~atoms/darkTheme";
import TabBarIcon from "~components/tabBarIcon/tabBarIcon";

export default function Layout1() {
  const usernameData = useAtomValue(usernameAtom);
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
        headerStyle: {
          backgroundColor: isDarkTheme ? "#000" : "#fff",
        },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Tabs.Screen
        name="cert"
        options={{
          href: usernameData === "user" ? "home/" : null,
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
          href: usernameData === "admin" ? "home/BarCodeScanner" : null,
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
        name="History"
        options={{
          href: usernameData === "admin" ? "home/History" : null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <FontAwesome
                name="history"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerTitle: `${t("ScanHistory")}`,
        }}
      />

      <Tabs.Screen
        name="Add"
        options={{
          href: usernameData === "user" ? "home/Add" : null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <AntDesign
                name="addfile"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerTitle: "Add",
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

      <Tabs.Screen
        name="Profile"
        options={{
          href: usernameData === "user" ? "home/Profile" : null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <FontAwesome name="user" size={focused ? 28 : 24} color={color} />
            </TabBarIcon>
          ),
          headerTitle: `${t("Profile")}`,
        }}
      />
    </Tabs>
  );
}
