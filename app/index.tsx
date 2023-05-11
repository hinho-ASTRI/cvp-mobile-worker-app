import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";

import { usernameAtom } from "~atoms/username";
import { isLoggedInAtom } from "~atoms/isLoggedIn";

export default function Entry() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const username = useAtomValue(usernameAtom);
  console.log("isloggedin", isLoggedIn);

  return (
    <Redirect
      href={
        isLoggedIn
          ? username === "user" || username === "W000001"
            ? "/home/cert"
            : "/home/BarCodeScanner"
          : "/(auth)/sign-in"
      }
    />
  );
}
