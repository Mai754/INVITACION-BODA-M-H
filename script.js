function mostrarInvitacion() {
  document.getElementById('pantallaInicial').style.display = 'none';
  document.getElementById('contenidoPrincipal').style.display = 'block';
}
function mostrarModal() {
  const modal = document.getElementById("modalRegalo");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // bloquear scroll de fondo
}

function cerrarModal() {
  const modal = document.getElementById("modalRegalo");
  modal.style.display = "none";
  document.body.style.overflow = ""; // restaurar scroll
}

// Cierre al hacer clic fuera del modal-content
document.getElementById("modalRegalo").addEventListener("click", function () {
  cerrarModal();
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

function confirmarInvitado() {
  const input = document.getElementById("nombreInvitado");
  const nombre = input.value.trim();
  const mensaje = document.getElementById("mensaje-confirmacion");
  const form = document.querySelector(".form-group"); // capturamos el formulario

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

  const url = `https://script.google.com/macros/s/AKfycbxC-GDlTe_CHVjeM22BudkMaoJXTLBqbROc_U9-A543HSfCAZtJ7ifWaPKLJjmcUAUZOA/exec?nombre=${nombre}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const nombreDecoded = decodeURIComponent(nombre);

      if (data.result === "success") {
        mensaje.textContent = `¡Gracias, ${nombreDecoded}, por confirmar tu asistencia!`;
        mensaje.classList.remove("oculto");

        // Ocultar formulario al confirmar
        form.style.display = "none";

        setTimeout(() => {
          mensaje.classList.add("oculto");
          mensaje.textContent = "";
        }, 3000);

        input.value = "";
      } else {
        mensaje.textContent = "Ocurrió un error en el servidor. Intenta más tarde.";
        mensaje.classList.remove("oculto");

        setTimeout(() => {
          mensaje.classList.add("oculto");
          mensaje.textContent = "";
        }, 3000);

        input.value = "";
      }
    })
    .catch(err => {
      console.error("Error al enviar:", err);
      alert("No se pudo enviar tu confirmación. Verifica tu conexión.");
    });

  return false;
}


function scrollGaleria(direccion) {
  const galeria = document.getElementById('galeriaScroll');
  const scrollCantidad = 250; // píxeles por clic

  if (galeria) {
    galeria.scrollBy({
      left: direccion * scrollCantidad,
      behavior: 'smooth'
    });
  }
}

// Auto-scroll de la galería
const galeria = document.getElementById("galeriaScroll");
galeria.addEventListener("mouseover", () => clearInterval(autoScroll));
galeria.addEventListener("mouseleave", () => {
  autoScroll = setInterval(() => {
    galeria.scrollLeft += 210;
    if (galeria.scrollLeft + galeria.clientWidth >= galeria.scrollWidth) {
      galeria.scrollLeft = 0;
    }
  }, 3000);
});
 // cambia cada 3 segundos

// Mostrar imagen en grande
document.querySelectorAll('.galeria-scroll img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('imagenGrande').src = img.src;
    document.getElementById('modalImagen').style.display = 'flex';
  });
});

// Cerrar modal
function cerrarModalImagen() {
  document.getElementById('modalImagen').style.display = 'none';
}


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

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.body.innerHTML = "<h2>Invitación no válida.</h2>";
    return;
  }

  const docRef = db.collection('links').doc(id);

  try {
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      if (data.usado) {
        document.body.innerHTML = "<h2>Este enlace ya fue utilizado.</h2>";
        return;
      } else {
        await docRef.update({ usado: true, fechaAcceso: new Date() });
        document.getElementById('contenido').style.display = 'block';
      }
    } else {
      // Primer uso: crea el documento y marca como usado
      await docRef.set({ usado: true, fechaAcceso: new Date() });
      document.getElementById('contenido').style.display = 'block';
    }
  } catch (error) {
    console.error("Error al validar link:", error);
    document.body.innerHTML = "<h2>Error al cargar la invitación.</h2>";
  }
});


