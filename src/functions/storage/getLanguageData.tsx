import AsyncStorage from "@react-native-async-storage/async-storage";

const getLanguageData: (i18n: any) => void = async (i18n) => {
  try {
    const language = await AsyncStorage.getItem("language");
    if (language !== null) {
      i18n.changeLanguage(language);
    }
  } catch (e) {
    // error reading value
  }
};

export default getLanguageData;
