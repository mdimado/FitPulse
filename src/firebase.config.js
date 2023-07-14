


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { collection, getDocs } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyACp7cqgnwoU22Z7ydVRmXcFYWUfAN0cYA",
  authDomain: "fitpulse-8e00f.firebaseapp.com",
  projectId: "fitpulse-8e00f",
  storageBucket: "fitpulse-8e00f.appspot.com",
  messagingSenderId: "701292956926",
  appId: "1:701292956926:web:0768fc957f7bd2c8b829af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;