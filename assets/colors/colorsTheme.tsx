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
    textColor: Colors.black,
  },
  dark: {
    screenBG: Colors.black,
    textColor: Colors.white,
  },
};

export default colorsTheme;
