import { Colors } from "react-native-ui-lib";

type theme = {
  screenBG: string;
  textColor: string;
};

type mode = "light" | "dark";

const colorsTheme: {
  [key in mode]: theme;
} = {
  light: {
    screenBG: Colors.white,
    textColor: Colors.grey10,
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
  },
};

export default colorsTheme;
