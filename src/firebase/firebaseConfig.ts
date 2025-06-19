// firebase/firebaseConfig.ts

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC1niagsjTF1bzmXeTSpb-WVGoWF-hqLRo",
  authDomain: "tasktriumph.firebaseapp.com",
  projectId: "tasktriumph",
  storageBucket: "tasktriumph.appspot.com", // ✅ Fixed
  messagingSenderId: "851279586148",
  appId: "1:851279586148:web:5331480f40753b9207d071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth instance
export const auth = getAuth(app);
