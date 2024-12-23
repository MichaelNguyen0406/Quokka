// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7lhr3JnpukgHC_NS3A6UBBUqKdk9p_wo",
  authDomain: "mini-social-7e3bd.firebaseapp.com",
  projectId: "mini-social-7e3bd",
  storageBucket: "mini-social-7e3bd.firebasestorage.app",
  messagingSenderId: "725677280915",
  appId: "1:725677280915:web:81b17711fc8dadbddc4766",
  measurementId: "G-CP3BE12E68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

connectAuthEmulator(auth, "http://localhost:9099");

connectFirestoreEmulator(db, "localhost", 8080);

export { auth, db };
