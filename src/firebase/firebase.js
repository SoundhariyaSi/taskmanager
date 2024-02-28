// Import the necessary authentication functions
import { getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyD7AeHG23ytHG9qgazKDrF2qnzsWbIIHrY",
    authDomain: "task-management-app-44e32.firebaseapp.com",
    projectId: "task-management-app-44e32",
    storageBucket: "task-management-app-44e32.appspot.com",
    messagingSenderId: "477166431327",
    appId: "1:477166431327:web:435846f828df02ef093fea"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication object
export const auth = getAuth(app);
export const db=getFirestore(app);

