// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK3LcD3rgmK-f81y7J_LU5H3utIScu6rU",
  authDomain: "budget-tracker-2cb7e.firebaseapp.com",
  projectId: "budget-tracker-2cb7e",
  storageBucket: "budget-tracker-2cb7e.firebasestorage.app",
  messagingSenderId: "687862796265",
  appId: "1:687862796265:web:99971e37d1e2b17b13c578",
  measurementId: "G-L68TWXM7G6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // <--- KUNCI: Gunakan 'export' di sini