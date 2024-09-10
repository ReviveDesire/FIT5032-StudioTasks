// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVh9TsUf8kiDbv8kM2DrMCEcAt9leRvH4",
    authDomain: "week7-yuhan-8a399.firebaseapp.com",
    projectId: "week7-yuhan-8a399",
    storageBucket: "week7-yuhan-8a399.appspot.com",
    messagingSenderId: "770850739952",
    appId: "1:770850739952:web:498cd1d7d23e6269c89435"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db