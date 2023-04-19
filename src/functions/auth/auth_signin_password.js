import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

export const handleLogin = (username, password) => {
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in");

      // ...
    })
    .catch((error) => {
      console.log("Invalid username or password");

      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
