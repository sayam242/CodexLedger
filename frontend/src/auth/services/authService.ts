import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import type {
  User,
} from "firebase/auth";

import { auth }
from "../firebase/firebase";

import {loginUser} from"../../api/auth.api";
import {sendTokenToExtension} from "./extensionAuthService";

const googleProvider =
  new GoogleAuthProvider();

export async function signInWithGoogle():
Promise<User> {

  const result =
    await signInWithPopup(
      auth,
      googleProvider
    );

  const user =
    result.user;

  const token = await loginUser({

    id:
      user.uid,

    name:
      user.displayName ?? "",

    email:
      user.email ?? "",

    photoUrl:
      user.photoURL ?? ""

  });

  await sendTokenToExtension(
    token
  );
  setTimeout(
    () => {

      window.close();

    },

    1500
  );

  return user;

}


