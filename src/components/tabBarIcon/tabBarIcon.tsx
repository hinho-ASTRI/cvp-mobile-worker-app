import { View } from "react-native";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { useAtomValue } from "jotai";

type TabBarIconProps = {
  focused: boolean;
  children: React.ReactNode;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, children }) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <View
      className="flex-1 justify-center"
      style={
        focused
          ? {
              borderBottomWidth: 3,
              borderBottomColor: isDarkTheme ? "white" : "black",
            }
          : null
      }
    >
      {children}
    </View>
  );
};

export default TabBarIcon;
