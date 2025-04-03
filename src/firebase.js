// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbGX-i5WJqSJPGS_TcnuMB-f3vIFmC7eo",
    authDomain: "psstore-9f30c.firebaseapp.com",
    projectId: "psstore-9f30c",
    storageBucket: "psstore-9f30c.firebasestorage.app",
    messagingSenderId: "124723907843",
    appId: "1:124723907843:web:f10e4a04e0e482e7ceed36",
    measurementId: "G-GFTK6WM6SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, db, storage,getFirestore, collection, addDoc, getDocs, deleteDoc, doc,getStorage, ref, uploadBytes, getDownloadURL  };