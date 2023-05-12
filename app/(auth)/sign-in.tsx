import { Text, View, Image, Alert } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetAtom } from "jotai";

import { usernameAtom } from "~atoms/username";
import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/CustomInput";
import CustomButton from "~components/buttons/CustomButton";

import { accessTokenAtom } from "~atoms/accessToken";

export default function SignIn() {
  const { t } = useTranslation();

  const router = useRouter();

  const setUsernameData = useSetAtom(usernameAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler: (username: string, password: string) => void = (
    username,
    password
  ) => {
    // fetch("http://localhost:8080/login", {
    // fetch("http://192.168.2.100:8081/auth/", {
    fetch("http://192.168.1.12:8081/auth/", {
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
        // return response.json();
        return response.text();
      })
      .then((data) => {
        // store tokens in AsyncStorage
        // AsyncStorage.setItem("accessToken", data.token);
        AsyncStorage.setItem("accessToken", data);
        setAccessToken(data);
        console.log(data);
        AsyncStorage.setItem("username", username);
        setUsernameData(username);
        // redirect to MainScreen
        if (username === "user" || username === "W000001") {
          router.replace("/home/cert");
        } else if (username === "admin") {
          router.replace("/home/BarCodeScanner");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Login failed",
          "Please check your username and password and try again."
        );
      });
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DismissKeyboard>
        <View className="items-center bg-[#d3d3d3] flex-1 ">
          <Image
            className={`w-[250px] sm:w-[300px] h-[25%] mt-[15%] sm:mt-[20%] mb-[5%]`}
            resizeMode="contain"
            source={require("../../assets/icon/1024px-CIC_logo.png")}
          ></Image>
          <Text className="text-2xl mb-4">{`${t("Hello")}`}</Text>
          <Text className="mb-2">{`${t("WelcomeText")}`}</Text>
          <CustomInput
            placeholder={`${t("UsernamePlaceholder")}`}
            setValue={setUsername}
            value={username}
            icon={<FontAwesome name="user" size={24} color="darkgrey" />}
            // rules={{ required: "Username is required" }}
          />

          <CustomInput
            placeholder={`${t("PasswordPlaceholder")}`}
            setValue={setPassword}
            value={password}
            icon={<Entypo name="lock" size={24} color="darkgrey" />}
            password={true}
            // rules={{ required: "Username is required" }}
          />

          <CustomButton
            addStyle={{ width: "70%", flexDirection: "column" }}
            widthPerct="80%"
            text={`${t("SignIn")}`}
            onPress={() => loginHandler(username, password)}
            bgColor="black"
            fgColor="white"
            flexDir="column"
          />

          <Text className="text-black my-2 sm:my-6">{`${t(
            "ForgotPassword"
          )}`}</Text>

          <Text className="text-black my-2 sm:my-4">{`${t("SignUp")}`}</Text>
          <LanguagePicker />
        </View>
      </DismissKeyboard>
    </>
  );
}
