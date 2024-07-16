// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { updateCurrentUser } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7af_zaLffNLt-XVgs2o2v80Ls0cdvJqM",
  authDomain: "react-native-26bd5.firebaseapp.com",
  projectId: "react-native-26bd5",
  storageBucket: "react-native-26bd5.appspot.com",
  messagingSenderId: "457518158847",
  appId: "1:457518158847:web:53486cd0f6bd3e7cebcdca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
