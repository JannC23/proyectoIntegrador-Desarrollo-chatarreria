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

  // Mantener actualizado el año del pie de página.
  document.querySelectorAll(".anio-actual").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
