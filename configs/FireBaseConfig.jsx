// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPd0qjcW91QMw0hogVLu_9J4lwmyXPG8",
  authDomain: "sample-7440c.firebaseapp.com",
  databaseURL: "https://sample-7440c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sample-7440c",
  storageBucket: "sample-7440c.firebasestorage.app",
  messagingSenderId: "546734661515",
  appId: "1:546734661515:web:5b6f8b4cb44815d8e6998e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);