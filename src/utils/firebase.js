// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPVVOLjMwuu3ld8zQUfJu6C0SUpSpqAhc",
  authDomain: "tenedores-e254b.firebaseapp.com",
  projectId: "tenedores-e254b",
  storageBucket: "tenedores-e254b.appspot.com",
  messagingSenderId: "77787601996",
  appId: "1:77787601996:web:33148035cffad14ef968e9",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

export const initFirebase = initializeApp(firebaseConfig);
