const formulario = document.getElementById("form-especialidad");
const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const selectEstado = document.getElementById("estado");
const errorNombre = document.getElementById("error-nombre");
const errorDescripcion = document.getElementById("error-descripcion");
const mensajeExito = document.getElementById("mensaje-exito");
const botonGuardar = document.getElementById("boton-guardar");

// Devuelve el mensaje de error, o "" si el nombre es válido
function validarNombre(nombre) {
  if (nombre === "") {
    return "El nombre es obligatorio.";
  }
  if (nombre.length < 3 || nombre.length > 100) {
    return "El nombre debe tener entre 3 y 100 caracteres.";
  }
  if (existeEspecialidad(nombre)) {
    return "Ya existe una especialidad con ese nombre.";
  }
  return "";
}

function validarDescripcion(descripcion) {
  if (descripcion === "") {
    return "La descripción es obligatoria.";
  }
  if (descripcion.length < 10 || descripcion.length > 100) {
    return "La descripción debe tener entre 10 y 100 caracteres.";
  }
  return "";
}

function mostrarError(campo, elementoError, mensaje) {
  elementoError.textContent = mensaje;
  campo.classList.toggle("invalido", mensaje !== "");
}

// Al escribir, se borra el error de ese campo
inputNombre.addEventListener("input", () => mostrarError(inputNombre, errorNombre, ""));
inputDescripcion.addEventListener("input", () => mostrarError(inputDescripcion, errorDescripcion, ""));

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();

  const mensajeNombre = validarNombre(nombre);
  const mensajeDescripcion = validarDescripcion(descripcion);

  mostrarError(inputNombre, errorNombre, mensajeNombre);
  mostrarError(inputDescripcion, errorDescripcion, mensajeDescripcion);

  if (mensajeNombre !== "") {
    inputNombre.focus();
    return;
  }
  if (mensajeDescripcion !== "") {
    inputDescripcion.focus();
    return;
  }

  agregarEspecialidad({
    nombre: nombre,
    descripcion: descripcion,
    activo: selectEstado.value === "activo"
  });

  mensajeExito.textContent = `La especialidad "${nombre}" se guardó correctamente.`;
  botonGuardar.disabled = true;

  // Vuelve al listado después de mostrar el mensaje
  setTimeout(() => {
    window.location.href = "especialidades.html";
  }, 1500);
});
