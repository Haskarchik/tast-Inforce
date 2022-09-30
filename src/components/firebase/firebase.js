// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSpptYI974Gjl4BZ79hOBShW63LpfEzwo",
  authDomain: "inforse-task.firebaseapp.com",
  databaseURL: "https://inforse-task-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inforse-task",
  storageBucket: "inforse-task.appspot.com",
  messagingSenderId: "298217712793",
  appId: "1:298217712793:web:0c26a1ea17445d250edc08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

