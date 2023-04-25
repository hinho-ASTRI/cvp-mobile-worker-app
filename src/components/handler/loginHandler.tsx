import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginHandler: (username: string, password: string) => void = (
  username,
  password
) => {
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // store tokens in AsyncStorage
      AsyncStorage.setItem("accessToken", data.token);
      AsyncStorage.setItem("refreshToken", data.refresh_token);
    })
    .catch((error) => {
      console.error(error);
      Alert.alert(
        "Login failed",
        "Please check your username and password and try again."
      );
    });
};

export default loginHandler;
