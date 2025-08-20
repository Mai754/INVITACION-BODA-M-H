// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-l_xGz7XRSn0i9yveq4bJnpmr64pmOfE",
  authDomain: "invitados-1c12c.firebaseapp.com",
  projectId: "invitados-1c12c",
  storageBucket: "invitados-1c12c.appspot.com",
  messagingSenderId: "1026480334740",
  appId: "1:1026480334740:web:1a40033ab58e696d475181",
  measurementId: "G-G405RZXXNQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

