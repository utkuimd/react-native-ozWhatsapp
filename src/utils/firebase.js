// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkeGy3KQEXZkmZftho9YniTCkjhtYr4Pc",
    authDomain: "ozwhatsapp.firebaseapp.com",
    projectId: "ozwhatsapp",
    storageBucket: "ozwhatsapp.appspot.com",
    messagingSenderId: "462931473594",
    appId: "1:462931473594:web:be3a01b7585de58042be83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);