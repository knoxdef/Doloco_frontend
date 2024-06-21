// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtkKvIchjXnWfjjdSFexlE0t7tLpsY6_g",
  authDomain: "doloco-app.firebaseapp.com",
  projectId: "doloco-app",
  storageBucket: "doloco-app.appspot.com",
  messagingSenderId: "879415368432",
  appId: "1:879415368432:web:0bbf10df11ffb3dc754035",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export {FIREBASE_AUTH, FIRESTORE_DB, collection, doc, addDoc,}
