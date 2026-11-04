// JavaScript compartido por todas las páginas.
document.addEventListener("DOMContentLoaded", () => {
  // Se conserva la prueba que tenía el equipo, sin romper las páginas
  // en las que el botón no existe. Se acepta el ID nuevo y el antiguo.
  const botonPrueba = document.getElementById("botonPrueba") || document.getElementById("boton Prueba");
  if (botonPrueba) {
    botonPrueba.addEventListener("click", () => alert("Hello World!"));
  }

  // Punto 4: mostrar y ocultar información adicional de los avances.
  const botonDetalles = document.getElementById("botonDetallesAvances");
  const detalles = document.getElementById("detallesAvances");
  if (botonDetalles && detalles) {
    botonDetalles.addEventListener("click", () => {
      const estaOculto = detalles.classList.contains("d-none");
      detalles.classList.toggle("d-none");
      botonDetalles.textContent = estaOculto ? "Ocultar detalles" : "Mostrar detalles";
      botonDetalles.setAttribute("aria-expanded", String(estaOculto));
    });
  }

  // Contacto: validación básica del formulario.
  const formulario = document.getElementById("formContacto");
  if (formulario) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexNombre = /^[\p{L}][\p{L}\s'.-]*$/u;

    // Cada campo tiene una función que devuelve el error ("" = válido).
    const reglas = {
      nombre: (v) => v.length < 3 ? "Escribe tu nombre (mínimo 3 caracteres)."
        : !regexNombre.test(v) ? "El nombre solo puede tener letras y espacios." : "",
      correo: (v) => v === "" ? "Escribe tu correo electrónico."
        : !regexCorreo.test(v) ? "Escribe un correo válido, por ejemplo nombre@correo.com." : "",
      mensaje: (v) => v.length < 10 ? "El mensaje debe tener al menos 10 caracteres." : ""
    };

    // Valida un campo y pinta el estado (verde/rojo + texto de error).
    const validarCampo = (campo) => {
      const error = reglas[campo.name](campo.value.trim());
      campo.classList.toggle("is-invalid", error !== "");
      campo.classList.toggle("is-valid", error === "");
      campo.parentElement.querySelector(".invalid-feedback").textContent = error;
      return error === "";
    };

    const campos = Object.keys(reglas).map((n) => formulario.elements[n]);
    const contador = document.getElementById("contadorMensaje");

    // Validación en vivo: solo después de que el usuario ya interactuó.
    campos.forEach((campo) => {
      campo.addEventListener("blur", () => validarCampo(campo));
      campo.addEventListener("input", () => {
        if (campo.classList.contains("is-invalid")) validarCampo(campo);
      });
    });
    formulario.elements["mensaje"].addEventListener("input", (e) => {
      contador.textContent = e.target.value.length;
    });

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const resultados = campos.map(validarCampo);
      if (resultados.includes(false)) {
        campos[resultados.indexOf(false)].focus();
        return;
      }
      const nombre = formulario.elements["nombre"].value.trim().split(" ")[0];
      document.getElementById("toastTexto").textContent =
        `¡Gracias, ${nombre}! Recibimos tu mensaje (envío simulado).`;
      bootstrap.Toast.getOrCreateInstance(document.getElementById("toastContacto")).show();
      formulario.reset();
      campos.forEach((c) => c.classList.remove("is-valid", "is-invalid"));
      contador.textContent = "0";
    });
  }

  // Mantener actualizado el año del pie de página.
  document.querySelectorAll(".anio-actual").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
