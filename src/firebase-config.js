import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD9LhMxXy7WZ7j4vQmK4hsonFQIxvjF9nc",
  authDomain: "crud-react-ed7a4.firebaseapp.com",
  projectId: "crud-react-ed7a4",
  storageBucket: "crud-react-ed7a4.appspot.com",
  messagingSenderId: "540012292656",
  appId: "1:540012292656:web:d3a63d2dda3358d9699bf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth(app);