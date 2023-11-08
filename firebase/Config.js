import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs,query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword ,initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtjvQ5uUtRwsKGf6Rod28UfvBU1jQqDL4",
  authDomain: "quote-app-9254d.firebaseapp.com",
  projectId: "quote-app-9254d",
  storageBucket: "quote-app-9254d.appspot.com",
  messagingSenderId: "934841743467",
  appId: "1:934841743467:web:10c1b18d0dbe08f237592e"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = initializeAuth(app, {
  
});

export {
    firestore,
    auth,
    signInWithEmailAndPassword,
    collection,
    getDocs,
    addDoc,
    query,
    onSnapshot,
    orderBy,
    deleteDoc,
    doc,
};