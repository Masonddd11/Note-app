import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ7WpogJrTdu7GMB2ehoJ4FgSclc6wdEo",
  authDomain: "note-app-37192.firebaseapp.com",
  projectId: "note-app-37192",
  storageBucket: "note-app-37192.appspot.com",
  messagingSenderId: "200677631332",
  appId: "1:200677631332:web:95cde79bbf5f2548140671",
  measurementId: "G-4BZ82BZG0N"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };