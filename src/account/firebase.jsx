import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA1EkprwRZcZd8lK8_EvKcMLG0vtSDUeng",
  authDomain: "chatauth-e512a.firebaseapp.com",
  projectId: "chatauth-e512a",
  storageBucket: "chatauth-e512a.appspot.com",
  messagingSenderId: "874119018542",
  appId: "1:874119018542:web:aef086bd6ced84dac3c7bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore();
