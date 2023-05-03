import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";

import { isLoggedInAtom } from "~atoms/isLoggedIn";

export default function Entry() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  console.log("isloggedin", isLoggedIn);

  return <Redirect href={isLoggedIn ? "/home/cert" : "/(auth)/sign-in"} />;
}
