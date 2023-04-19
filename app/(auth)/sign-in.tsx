import { Text, View, Image, Alert } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/CustomInput";
import CustomButton from "~components/buttons/CustomButton";
import { useAuth } from "~context/auth";

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://192.168.1.12:8080/login", {
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
        // navigate to MainScreen component
        signIn();
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
            className="w-[250px] sm:w-[300px] h-[15%] mt-[15%] sm:mt-[35%] mb-[5%] sm:mb-[15%]"
            resizeMode="contain"
            source={require("../../assets/CIC_logo.svg.png")}
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
            onPress={() => handleLogin()}
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
