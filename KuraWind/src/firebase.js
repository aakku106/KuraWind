/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaAakfxqgwbnLyL1_DSw3zwDun8DZrMKM",
  authDomain: "kurawind.firebaseapp.com",
  projectId: "kurawind",
  storageBucket: "kurawind.firebasestorage.app",
  messagingSenderId: "341881951543",
  appId: "1:341881951543:web:cef783ce7e7f19658df6b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
