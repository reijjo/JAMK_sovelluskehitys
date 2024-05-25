// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "fuel-3ff95.firebaseapp.com",
  projectId: "fuel-3ff95",
  storageBucket: "fuel-3ff95.appspot.com",
  messagingSenderId: "527839327026",
  appId: "1:527839327026:web:62235c254e22c120fe9d2b",
  measurementId: "G-F5WSJTR8GS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
