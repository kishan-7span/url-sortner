// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy731ggMFPlXC8Yp5TL2czo4sR6UOE4hs",
  authDomain: "url-shortner-3e034.firebaseapp.com",
  projectId: "url-shortner-3e034",
  storageBucket: "url-shortner-3e034.firebasestorage.app",
  messagingSenderId: "15026655058",
  appId: "1:15026655058:web:a9f7b496f09ddceae0f48b",
  measurementId: "G-ZNZJK0NNXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
