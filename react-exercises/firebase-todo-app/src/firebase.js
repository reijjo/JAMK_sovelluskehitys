import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxprNP7cvuNfbc-hPmv3Q6aD_Hkjd2WYY",
  authDomain: "todo-4f257.firebaseapp.com",
  projectId: "todo-4f257",
  storageBucket: "todo-4f257.appspot.com",
  messagingSenderId: "91529157701",
  appId: "1:91529157701:web:368148d59c2b30e393572c",
  measurementId: "G-3WF9PVG80Z",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
