// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS8dVapYnHlOcICOsfjdQFDSlbLXQyrxI",
  authDomain: "whatsapp-app-e786a.firebaseapp.com",
  projectId: "whatsapp-app-e786a",
  storageBucket: "whatsapp-app-e786a.appspot.com",
  messagingSenderId: "445260654051",
  appId: "1:445260654051:web:4e17c7be0bab26aa772cd6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const db2 = getFirestore(app);
const storage = getStorage();

export { db, app, storage, db2 };
