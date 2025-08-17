import invitados from "./links_invitados.json" assert { type: "json" };
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-l_xGz7XRSn0i9yveq4bJnpmr64pmOfE",
  authDomain: "invitados-1c12c.firebaseapp.com",
  projectId: "invitados-1c12c",
  storageBucket: "invitados-1c12c.appspot.com", // ⚠️ este era ".app" y debe ser ".appspot.com"
  messagingSenderId: "1026480334740",
  appId: "1:1026480334740:web:1a40033ab58e696d475181",
  measurementId: "G-G405RZXXNQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Subir invitados a Firestore
async function subirInvitados() {
  try {
    for (let invitado of invitados) {
      await addDoc(collection(db, "invitados"), invitado);
      console.log("Subido:", invitado.Invitado);
    }
    console.log("✅ Todos los invitados se subieron con éxito.");
  } catch (e) {
    console.error("❌ Error subiendo invitados:", e);
  }
}

subirInvitados();

