// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1xLd3tOhuVum6aKImy-Sl7CQsS7QsNBs",
  authDomain: "scibrief-ebdcb.firebaseapp.com",
  projectId: "scibrief-ebdcb",
  storageBucket: "scibrief-ebdcb.firebasestorage.app",
  messagingSenderId: "553239170367",
  appId: "1:553239170367:web:f3965d8cad91601b86178a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
