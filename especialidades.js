const CLAVE_ESPECIALIDADES = "especialidades";

const ESPECIALIDADES_INICIALES = [
    { id: "1", nombre: "Cardiología", descripcion: "Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.", activo: true },
    { id: "2", nombre: "Neurología", descripcion: "Diagnóstico y tratamiento de las afecciones del sistema nervioso.", activo: true },
    { id: "3", nombre: "Dermatología", descripcion: "Atención integral de enfermedades de la piel, uñas y cabello.", activo: false },
    { id: "4", nombre: "Pediatría", descripcion: "Cuidado médico de lactantes, niños y adolescentes.", activo: true }
];

function obtenerEspecialidades() {
    const datos = localStorage.getItem(CLAVE_ESPECIALIDADES);

    if (datos === null) {
        guardarEspecialidades(ESPECIALIDADES_INICIALES);
        return [...ESPECIALIDADES_INICIALES];
    }

    return JSON.parse(datos);
}

function guardarEspecialidades(especialidades) {
    localStorage.setItem(CLAVE_ESPECIALIDADES, JSON.stringify(especialidades));
}

function agregarEspecialidad(esp) {
    const especialidades = obtenerEspecialidades();

    const nueva = {
        id: crypto.randomUUID(),
        nombre: esp.nombre.trim(),
        descripcion: esp.descripcion.trim(),
        activo: esp.activo !== false
    };

    especialidades.push(nueva);
    guardarEspecialidades(especialidades);
    return nueva;
}

function buscarEspecialidades(texto) {
    const especialidades = obtenerEspecialidades();
    const busqueda = texto.trim().toLowerCase();

    if (busqueda === "") {
        return especialidades;
    }

    return especialidades.filter(esp =>
        esp.nombre.toLowerCase().includes(busqueda) ||
        esp.descripcion.toLowerCase().includes(busqueda)
    );
}

function existeEspecialidad(nombre) {
    const buscado = nombre.trim().toLowerCase();
    return obtenerEspecialidades().some(esp => esp.nombre.toLowerCase() === buscado);
}