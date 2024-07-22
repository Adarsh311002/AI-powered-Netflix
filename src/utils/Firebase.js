// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "netflix-gpt-ef17c.firebaseapp.com",
  projectId: "netflix-gpt-ef17c",
  storageBucket: "netflix-gpt-ef17c.appspot.com",
  messagingSenderId: "211077668914",
  appId: "1:211077668914:web:46e831da88c791aac3dc2b",
  measurementId: "G-HEJP21DCWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();