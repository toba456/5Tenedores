// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBPVVOLjMwuu3ld8zQUfJu6C0SUpSpqAhc",
  authDomain: "tenedores-e254b.firebaseapp.com",
  projectId: "tenedores-e254b",
  storageBucket: "tenedores-e254b.appspot.com",
  messagingSenderId: "77787601996",
  appId: "1:77787601996:web:33148035cffad14ef968e9",
};

export const initFirebase = initializeApp(firebaseConfig);
