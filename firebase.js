import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2XOa158tXFT61PbI6BZDwuROnrRrM4mY",
    authDomain: "login-mobilapp.firebaseapp.com",
    projectId: "login-mobilapp",
    storageBucket: "login-mobilapp.firebasestorage.app",
    messagingSenderId: "699685078128",
    appId: "1:699685078128:web:7c5c9a808483632dc1e0b5",
    measurementId: "G-Q68R50542N",
};

// تأكد من عدم إعادة تهيئة Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// تهيئة Firestore و Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
