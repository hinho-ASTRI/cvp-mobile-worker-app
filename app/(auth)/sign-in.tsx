import { Text, View, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/CustomInput";
import CustomButton from "~components/buttons/CustomButton";

export default function SignIn() {
  const { t } = useTranslation();

  const router = useRouter();

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        // () => fallBackToDefaultAuth()
      );
    }
    await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      // disableDeviceFallback: true,
    });
  };
  console.log("isBiometricSupported", isBiometricSupported);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler: (username: string, password: string) => void = (
    username,
    password
  ) => {
    // fetch("http://localhost:8080/login", {
    fetch("http://192.168.2.100:8081/auth/", {
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
        // redirect to MainScreen
        router.replace("/home/cert");
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
            className="w-[250px] sm:w-[300px] h-[15%] mt-[30%] sm:mt-[35%] mb-[5%] sm:mb-[15%]"
            resizeMode="contain"
            source={require("../../assets/icon/CIC_logo.svg.png")}
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

          {isBiometricSupported && (
            <CustomButton
              addStyle={{ width: "70%", flexDirection: "column" }}
              widthPerct="80%"
              text="Login with Face ID"
              onPress={() => handleBiometricAuth()}
              bgColor="black"
              fgColor="white"
              flexDir="column"
            />
          )}

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
