import { Typography } from "react-native-ui-lib";
import { useAtomValue } from "jotai";

import { fontSizeAtom } from "~atoms/fontSize";

type sliderValue = 0 | 1 | 2;

type fontSize = 25 | 35 | 45;

const fontSizeMap: {
  [key in sliderValue]: fontSize;
} = {
  0: 25,
  1: 35,
  2: 45,
};

const setTypography = (value) => {
  // const value = useAtomValue(fontSizeAtom);
  Typography.loadTypographies({
    h1: {
      fontSize: fontSizeMap[value],
      fontWeight: "300",
      lineHeight: fontSizeMap[value] + 5,
    },
  });
};

export default setTypography;
