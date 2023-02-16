// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4NWZ964X4xclwdjlGYp0ztGClV6bVJXU",
    authDomain: "personal-site-1ebb3.firebaseapp.com",
    projectId: "personal-site-1ebb3",
    storageBucket: "personal-site-1ebb3.appspot.com",
    messagingSenderId: "543639207637",
    appId: "1:543639207637:web:1cae2c42c2e8baead02c5c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();