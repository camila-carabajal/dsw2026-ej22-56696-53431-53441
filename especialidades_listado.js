document.addEventListener("DOMContentLoaded", () => {
    const tablaBody = document.getElementById("tabla-especialidades-body");
    const inputBuscar = document.getElementById("input-buscar");
    const btnBuscar = document.getElementById("btn-buscar");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    function renderizarTabla(lista) {
        tablaBody.innerHTML = "";

        if (!lista || lista.length === 0) {
            mensajeVacio.style.display = "block";
            return;
        }

        mensajeVacio.style.display = "none";

        lista.forEach(esp => {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid #dde3ec";

            const estadoTexto = esp.activo !== false ? "Activo" : "Inactivo";
            const estadoClase = esp.activo !== false ? "color: #1b7a43; font-weight: 600;" : "color: #c62828; font-weight: 600;";

            tr.innerHTML = `
                <td style="padding: 0.75rem;"><strong>${esp.nombre}</strong></td>
                <td style="padding: 0.75rem; color: #6b7a90;">${esp.descripcion}</td>
                <td style="padding: 0.75rem;"><span style="${estadoClase}">${estadoTexto}</span></td>
                <td style="padding: 0.75rem; text-align: right;">
                    <button type="button" class="boton-secundario" style="padding: 0.3rem 0.6rem; font-size: 0.8em;">Editar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }

    // Carga inicial al cargar la página
    if (typeof obtenerEspecialidades === "function") {
        renderizarTabla(obtenerEspecialidades());
    }

    // Funcionalidad de búsqueda
    const ejecutarBusqueda = () => {
        const texto = inputBuscar.value;
        if (typeof buscarEspecialidades === "function") {
            const resultados = buscarEspecialidades(texto);
            renderizarTabla(resultados);
        }
    };

    btnBuscar.addEventListener("click", ejecutarBusqueda);
    inputBuscar.addEventListener("input", ejecutarBusqueda);
});

