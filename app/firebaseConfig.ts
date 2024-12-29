
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0r9qwFHzbYL4buhY5jBP_FAQreSHdbwY",
  authDomain: "coursespage-da7ae.firebaseapp.com",
  projectId: "coursespage-da7ae",
  storageBucket: "coursespage-da7ae.firebasestorage.app",
  messagingSenderId: "930463477841",
  appId: "1:930463477841:web:7f5ae297a4d4f58e888870",
  measurementId: "G-WVPDR4X4Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Baza danych
const storage = getStorage(app); // Przechowywanie plików

export { db, storage };