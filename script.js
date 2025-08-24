function mostrarInvitacion() {
  document.getElementById('pantallaInicial').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'block';
}

function mostrarModal() {
  const modal = document.getElementById("modalRegalo");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  const modal = document.getElementById("modalRegalo");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Hacerlas globales si usas onclick en el HTML
window.mostrarModal = mostrarModal;
window.cerrarModal = cerrarModal;


// Cierre al hacer clic fuera del modal-content
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalRegalo");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) { // solo cuando clic en fondo
        cerrarModal();
      }
    });
  }
});

// Cambia esta fecha a la que desees (Año, Mes(0-11), Día, Hora, Minuto, Segundo)
const fechaBoda = new Date(2025, 9, 18, 17, 0, 0); // Septiembre = 8

const diasSpan = document.getElementById('dias');
const horasSpan = document.getElementById('horas');
const minutosSpan = document.getElementById('minutos');
const segundosSpan = document.getElementById('segundos');

function actualizarElementoConAnimacion(elemento, nuevoValor) {
  if (elemento.textContent !== nuevoValor) {
    elemento.textContent = nuevoValor;

    elemento.classList.remove("animar");
    void elemento.offsetWidth; // Forzar reflow
    elemento.classList.add("animar");
  }
}

function actualizarCuentaRegresiva() {
  const ahora = new Date();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {
    ["00", "00", "00", "00"].forEach((v, i) => {
      [diasSpan, horasSpan, minutosSpan, segundosSpan][i].textContent = v;
    });
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  actualizarElementoConAnimacion(diasSpan, String(dias).padStart(2, '0'));
  actualizarElementoConAnimacion(horasSpan, String(horas).padStart(2, '0'));
  actualizarElementoConAnimacion(minutosSpan, String(minutos).padStart(2, '0'));
  actualizarElementoConAnimacion(segundosSpan, String(segundos).padStart(2, '0'));
}

setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();


function mostrarIndicaciones() {
  const popup = document.getElementById('popupIndicaciones');
  if (popup) {
    popup.classList.remove('oculto');
  } else {
    console.error('Elemento popupIndicaciones no encontrado');
  }
}

// Exponer función globalmente
window.mostrarIndicaciones = mostrarIndicaciones;

// === GALERÍA (seguro para type="module" y para páginas sin galería) ===
function initGaleria() {
  const galeria = document.getElementById('galeriaScroll');
  if (!galeria) return; // si no hay galería en esta página, salimos sin romper nada

  const SCROLL_PX = 250;

  // Mover galería (usado por botones e inline onclick)
  function scrollGaleria(direccion) {
    galeria.scrollBy({
      left: direccion * SCROLL_PX,
      behavior: 'smooth'
    });
  }

  // Exponer SOLO para soportar el HTML con onclick="scrollGaleria(...)"
  // (si no usas onclick, no pasa nada)
  window.scrollGaleria = scrollGaleria;

  // Botones (si existen)
  const btnIzq = document.querySelector('.flecha.izquierda');
  const btnDer = document.querySelector('.flecha.derecha');
  if (btnIzq) btnIzq.addEventListener('click', () => scrollGaleria(-1));
  if (btnDer) btnDer.addEventListener('click', () => scrollGaleria(1));

  // Auto-scroll con pausa al pasar el mouse
  let autoScroll = setInterval(() => {
    galeria.scrollLeft += 210;
    if (galeria.scrollLeft + galeria.clientWidth >= galeria.scrollWidth) {
      galeria.scrollLeft = 0;
    }
  }, 3000);

  galeria.addEventListener('mouseover', () => clearInterval(autoScroll));
  galeria.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      galeria.scrollLeft += 210;
      if (galeria.scrollLeft + galeria.clientWidth >= galeria.scrollWidth) {
        galeria.scrollLeft = 0;
      }
    }, 3000);
  });
}

// Asegura que el DOM exista antes de enganchar eventos
document.addEventListener('DOMContentLoaded', initGaleria);


// Mostrar modal con imagen
function abrirModalImagen(src) {
  const modal = document.getElementById('modalImagen');
  const imgGrande = document.getElementById('imagenGrande');
  if (modal && imgGrande) {
    imgGrande.src = src;
    modal.style.display = 'flex';
  }
}

// Cerrar modal
function cerrarModalImagen() {
  const modal = document.getElementById('modalImagen');
  if (modal) modal.style.display = 'none';
}

// Eventos seguros para móvil/PC
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalImagen');
  const cerrarBtn = document.getElementById('cerrarModal');

  if (!modal) return;

  // Botón de cerrar
  cerrarBtn.addEventListener('click', cerrarModalImagen);

  // Cerrar tocando fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModalImagen();
  });
});

// Exponer funciones globalmente
window.abrirModalImagen = abrirModalImagen;
window.cerrarModalImagen = cerrarModalImagen;


const audio = document.getElementById("musicaFondo");
const icono = document.getElementById("icono-audio");
let estaReproduciendo = false;

// Reproducir al primer toque en la pantalla
function activarAudio() {
  audio.play().then(() => {
    estaReproduciendo = true;
    icono.classList.remove("fa-volume-mute");
    icono.classList.add("fa-volume-up");
    document.removeEventListener("click", activarAudio);
  }).catch(err => {
    console.warn("Navegador bloqueó la reproducción automática:", err);
  });
}

document.addEventListener("click", activarAudio);

// Control del icono (mutear / reproducir)
icono.addEventListener("click", (e) => {
  e.stopPropagation(); // Evita que vuelva a disparar la activación

  if (estaReproduciendo) {
    audio.pause();
    estaReproduciendo = false;
    icono.classList.remove("fa-volume-up");
    icono.classList.add("fa-volume-mute");
  } else {
    audio.play().then(() => {
      estaReproduciendo = true;
      icono.classList.remove("fa-volume-mute");
      icono.classList.add("fa-volume-up");
    }).catch(err => {
      console.error("Error al reproducir el audio:", err);
    });
  }
});

// script.js
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// --- Validación de invitación al cargar la página ---
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = "error.html?msg=Invitación no válida.";
    return;
  }

  try {
    const docRef = doc(db, "invitados", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      window.location.href = "error.html?msg=Invitado no encontrado.";
      return;
    }

    const data = docSnap.data();
    if (data.usado) {
      window.location.href = "error.html?msg=Este enlace ya fue utilizado.";
      return;
    }

    // ✅ Invitación válida, dejamos que siga el flujo
    console.log("Invitación válida para:", data.Invitado || "invitado sin nombre");

  } catch (error) {
    console.error("Error al validar invitación:", error);
    window.location.href = "error.html?msg=Ocurrió un error al cargar la invitación.";
  }
});

// --- Función global para mostrar la invitación ---
window.mostrarInvitacion = function () {
  const pantallaInicial = document.getElementById("pantallaInicial");
  const contenidoPrincipal = document.getElementById("contenidoPrincipal");

  if (pantallaInicial) pantallaInicial.style.display = "none";
  if (contenidoPrincipal) contenidoPrincipal.style.display = "block";
};

// --- Confirmación de asistencia ---
function confirmarInvitado() {
  const input = document.getElementById("nombreInvitado");
  const nombre = input.value.trim();
  const mensaje = document.getElementById("mensaje-confirmacion");
  const form = document.querySelector(".form-group"); // formulario
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!soloLetras.test(nombre)) {
    mensaje.textContent = "Por favor, ingresa solo letras en el nombre.";
    mensaje.classList.remove("oculto");
    setTimeout(() => {
      mensaje.classList.add("oculto");
      mensaje.textContent = "";
    }, 3000);
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Enviar datos a Google Sheets
  const url = `https://script.google.com/macros/s/AKfycbxC-GDlTe_CHVjeM22BudkMaoJXTLBqbROc_U9-A543HSfCAZtJ7ifWaPKLJjmcUAUZOA/exec?nombre=${encodeURIComponent(nombre)}&id=${id}`;

  fetch(url)
    .then(res => res.json())
    .then(async data => {
      const nombreDecoded = decodeURIComponent(nombre);

      if (data.result === "success") {
        mensaje.textContent = `¡Gracias, ${nombreDecoded}, por confirmar tu asistencia!`;
        mensaje.classList.remove("oculto");

        // Ocultar formulario al confirmar
        form.style.display = "none";
        input.value = "";

        // ✅ Marcar la invitación como usada en Firebase SOLO después de confirmar
        try {
          const docRef = doc(db, "invitados", id);
          await updateDoc(docRef, { usado: true, fechaAcceso: new Date() });
        } catch (err) {
          console.error("Error al marcar invitación como usada:", err);
        }

        setTimeout(() => {
          mensaje.classList.add("oculto");
          mensaje.textContent = "";
        }, 3000);

      } else {
        mensaje.textContent = "Ocurrió un error en el servidor. Intenta más tarde.";
        mensaje.classList.remove("oculto");
        input.value = "";
        setTimeout(() => {
          mensaje.classList.add("oculto");
          mensaje.textContent = "";
        }, 3000);
      }
    })
    .catch(err => {
      console.error("Error al enviar:", err);
      alert("No se pudo enviar tu confirmación. Verifica tu conexión.");
    });

  return false; // Evita que se recargue la página
}

// Hacemos global la función para que el HTML la pueda llamar
window.confirmarInvitado = confirmarInvitado;


