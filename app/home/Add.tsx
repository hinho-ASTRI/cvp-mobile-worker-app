import { useState } from "react";
import { View, Text } from "react-native-ui-lib";
import { Picker } from "@react-native-picker/picker";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";
import CustomInput from "~components/CustomInput";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const isDarkTheme = useAtomValue(DarkThemeAtom);
  return (
    <View flex bg-screenBG>
      <View bg-screenBG className={`mx-4`}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          itemStyle={{
            color: isDarkTheme ? "white" : "black",
          }}
        >
          <Picker.Item label="Select an option" value="" />
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Email" value="email" />
        </Picker>

        {selectedOption === "name" && (
          <View>
            <Text textColor>First Name:</Text>
            <CustomInput
              value={firstName}
              widthPerct="100%"
              setValue={setFirstName}
              placeholder={"John"}
            />
            <Text textColor>Last Name:</Text>
            <CustomInput
              value={lastName}
              widthPerct="100%"
              setValue={setLastName}
              placeholder={"Chan"}
            />
          </View>
        )}

        {selectedOption === "email" && (
          <View>
            <Text textColor>Email:</Text>
            <CustomInput
              value={email}
              widthPerct="100%"
              setValue={setEmail}
              placeholder={"example@gmail.com"}
            />
            <Text textColor>Phone Number:</Text>
            <CustomInput
              value={phoneNumber}
              widthPerct="100%"
              setValue={setPhoneNumber}
              placeholder={"24561111"}
            />
          </View>
        )}
      </View>
    </View>
  );
}
