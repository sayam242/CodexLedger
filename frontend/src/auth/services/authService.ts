import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
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

export async function signInWithGoogle(
  setLoginInProgress: (value: boolean) => void
): Promise<User> {
  setLoginInProgress(true);

  try {
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

    return user;
  } catch (error) {
    setLoginInProgress(false);
    throw error;
  } finally {
    setLoginInProgress(false);
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Firebase sign out error:", error);
    throw error;
  }
}


