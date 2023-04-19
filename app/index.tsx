import { Redirect } from "expo-router";

export default function Hi({ navigation }) {
  return <Redirect href={"/home"} />;
}
