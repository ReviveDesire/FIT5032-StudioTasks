// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWYA4IFenW27YdIsDtkyqasSWIjWQjnUE",
  authDomain: "week7-yuhan-8a116.firebaseapp.com",
  projectId: "week7-yuhan-8a116",
  storageBucket: "week7-yuhan-8a116.appspot.com",
  messagingSenderId: "542068015110",
  appId: "1:542068015110:web:979a2796bf261437a3c387"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db