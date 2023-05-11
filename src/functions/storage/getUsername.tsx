import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

const getUsername: (setUsername: Dispatch<string>) => void = async (
  setUsername
) => {
  const usernameData = await AsyncStorage.getItem("username");
  if (usernameData !== null) {
    setUsername(usernameData);
  }
};

export default getUsername;
