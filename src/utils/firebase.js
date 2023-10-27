// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFaRA60hUSEbkaloh4Dh0z8ymQNiJsBuI",
  authDomain: "tenedores-7e0fd.firebaseapp.com",
  projectId: "tenedores-7e0fd",
  storageBucket: "tenedores-7e0fd.appspot.com",
  messagingSenderId: "1044895628174",
  appId: "1:1044895628174:web:50870de75f0d4c595a82df",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
