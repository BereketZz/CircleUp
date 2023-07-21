// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{ getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTMYPb5X3G0X__IrtlBCSK67LX-HYSGLw",
  authDomain: "circleup-7d0af.firebaseapp.com",
  projectId: "circleup-7d0af",
  storageBucket: "circleup-7d0af.appspot.com",
  messagingSenderId: "129493243876",
  appId: "1:129493243876:web:aeb9754505672c90ed99f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db= getFirestore()
export const storage= getStorage()
