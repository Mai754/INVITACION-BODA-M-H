import { db } from './firebase-config.js';
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

async function subirInvitados() {
  try {
    const response = await fetch('./links_invitados.json');
    const invitados = await response.json();

    for (let invitado of invitados) {
      // Aquí usamos `doc` para crear la referencia con ID único
      const ref = doc(collection(db, "invitados"), invitado.Invitado);
      await setDoc(ref, invitado);
      console.log("Subido:", invitado.Invitado);
    }

    console.log("✅ Todos los invitados se subieron con éxito.");
  } catch (error) {
    console.error("❌ Error subiendo invitados:", error);
  }
}

subirInvitados();

