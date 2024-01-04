
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDA7lh_58Z86IRl751KmXXs0O-11YI5YY0",
  authDomain: "insta-clone-de2b0.firebaseapp.com",
  projectId: "insta-clone-de2b0",
  storageBucket: "insta-clone-de2b0.appspot.com",
  messagingSenderId: "533943642291",
  appId: "1:533943642291:web:77030e076b78c765d628c6",
  measurementId: "G-9FX5JK2DCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, fireStore, storage}
