// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "artisans-compass",
  "appId": "1:643243336578:web:8e4c52a92c9948b41da59b",
  "storageBucket": "artisans-compass.firebasestorage.app",
  "apiKey": "AIzaSyDj4h-kGIo8gRdf_Gf5_8Tr92NCHERJdiw",
  "authDomain": "artisans-compass.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "643243336578"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    // Provide a dummy implementation or null if Firebase is not configured.
    // This is to avoid crashing the app in a development environment 
    // without Firebase credentials.
    console.warn("Firebase config is missing, Auth and Firestore features will be disabled.");
    app = null!;
    auth = null!;
    db = null!;
}


export { app, auth, db };
