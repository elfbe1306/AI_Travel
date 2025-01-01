// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sample-7440c.firebaseapp.com",
  databaseURL: "https://sample-7440c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sample-7440c",
  storageBucket: "sample-7440c.appspot.com",
  messagingSenderId: "546734661515",
  appId: "1:546734661515:web:5b6f8b4cb44815d8e6998e",
};

// Initialize Firebase App (only once)
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence (only once)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
