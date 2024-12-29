// Import Firebase libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0CZPNueJvcjrl_lgvbN1KmP9fSf0TC9Q",
  authDomain: "rehabilitation-c1ef7.firebaseapp.com",
  databaseURL: "https://rehabilitation-c1ef7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rehabilitation-c1ef7",
  storageBucket: "rehabilitation-c1ef7.appspot.com", // Fixed storageBucket format
  messagingSenderId: "502702135312",
  appId: "1:502702135312:web:401af09219cfd0f1a79295",
  measurementId: "G-2NQR3QLH29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Firebase Authentication
export const database = getDatabase(app); // Firebase Realtime Database

export default app;
