import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { en, zhHK, zhCN } from "assets/utils";

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "English",
  resources: {
    English: en,
    繁體中文: zhHK,
    简体中文: zhCN,
  },
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: "English",
  react: {
    useSuspense: false,
  },
});

export default i18next;
