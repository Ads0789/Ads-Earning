// firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1niagsjTF1bzmXeTSpb-WVGoWF-hqLRo",
  authDomain: "tasktriumph.firebaseapp.com",
  projectId: "tasktriumph",
  storageBucket: "tasktriumph.appspot.com",
  messagingSenderId: "851279586148",
  appId: "1:851279586148:web:5331480f40753b9207d071"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
