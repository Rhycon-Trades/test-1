import { auth } from "../firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

let user;

export const signInUser = function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const signUpUser = function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const signUserOut = function logOut() {
  signOut(auth);
};

export const changePassword = function password(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const autoSignIn = function authState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    }
  });
};
