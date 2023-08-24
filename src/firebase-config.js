import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDcTBO6GXzZjABBFzpJkosypmVOR9VWMdM",
  authDomain: "dase-tech-a0778.firebaseapp.com",
  projectId: "dase-tech-a0778",
  storageBucket: "dase-tech-a0778.appspot.com",
  messagingSenderId: "40553031683",
  appId: "1:40553031683:web:270b0a5aabbc7992d78636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth(app);