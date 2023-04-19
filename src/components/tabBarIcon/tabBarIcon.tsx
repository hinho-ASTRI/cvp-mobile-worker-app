import { View } from "react-native";

type TabBarIconProps = {
  focused: boolean;
  children: React.ReactNode;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, children }) => {
  return (
    <View
      className="flex-1 justify-center"
      style={
        focused ? { borderBottomWidth: 3, borderBottomColor: "black" } : null
      }
    >
      {children}
    </View>
  );
};

export default TabBarIcon;
