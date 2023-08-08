// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoP40NjdL-rsFoNOYeTLmDVjjHgu1CVSQ",
  authDomain: "incanto-pili.firebaseapp.com",
  projectId: "incanto-pili",
  storageBucket: "incanto-pili.appspot.com",
  messagingSenderId: "429763618217",
  appId: "1:429763618217:web:d30f67e539a9038eb350b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase
const storage = getStorage(app); // Initialize Firebase Storage 
const auth = getAuth(app) // Initialize Firebase Authentication 

export {app, storage, auth};
