import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo36y8yOwvy10JtNDkMpNNDMymnNkNdYc",
  authDomain: "self-diagnosis-a7eab.firebaseapp.com",
  projectId: "self-diagnosis-a7eab",
  storageBucket: "self-diagnosis-a7eab.firebasestorage.app",
  messagingSenderId: "550924167483",
  appId: "1:550924167483:web:f40337b2257d1ac7ffaf1e",
  measurementId: "G-SG6KHSL2KL"
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firestore インスタンスを取得
export const db = getFirestore(app);
