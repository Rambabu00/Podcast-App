// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcfnlfYxkLmPtjN0hva4KrRRw3yvkKcI8",
  authDomain: "podcast-app-79597.firebaseapp.com",
  projectId: "podcast-app-79597",
  storageBucket: "podcast-app-79597.appspot.com",
  messagingSenderId: "168216852418",
  appId: "1:168216852418:web:096f4d7dd950794ea2885b",
  measurementId: "G-DHC85QMZFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const  db=getFirestore(app);
 const auth=getAuth(app);
 const storage=getStorage(app);
 export {db,auth,storage};