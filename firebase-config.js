import invitados from "./links_invitados.json" assert { type: "json" };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-l_xGz7XRSn0i9yveq4bJnpmr64pmOfE",
  authDomain: "invitados-1c12c.firebaseapp.com",
  projectId: "invitados-1c12c",
  storageBucket: "invitados-1c12c.firebasestorage.app",
  messagingSenderId: "1026480334740",
  appId: "1:1026480334740:web:1a40033ab58e696d475181",
  measurementId: "G-G405RZXXNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function subirInvitados() {
  for (let invitado of invitados) {
    await addDoc(collection(db, "invitados"), invitado);
  }
}

subirInvitados();


