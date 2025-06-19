// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1niagsjTF1bzmXeTSpb-WVGoWF-hqLRo",
  authDomain: "tasktriumph.firebaseapp.com",
  projectId: "tasktriumph",
  storageBucket: "tasktriumph.firebasestorage.app",
  messagingSenderId: "851279586148",
  appId: "1:851279586148:web:5331480f40753b9207d071"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
