import { Colors } from "react-native-ui-lib";

const setTheme = (dark: boolean): void => {
  Colors.setScheme(dark ? "dark" : "light");
};

export default setTheme;
