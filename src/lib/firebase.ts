// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
} else {
    // Provide a dummy implementation or null if Firebase is not configured.
    // This is to avoid crashing the app in a development environment 
    // without Firebase credentials.
    console.warn("Firebase config is missing, Auth features will be disabled.");
    app = null!;
    auth = null!;
}


export { app, auth };
