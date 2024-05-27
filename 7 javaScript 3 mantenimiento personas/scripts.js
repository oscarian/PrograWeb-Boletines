// Selección de elementos del DOM
const formPersona = document.getElementById('form-persona');
const listaPersonas = document.getElementById('lista-personas');
const guardarDatosBtn = document.getElementById('guardar-datos');
const cargarDatosInput = document.getElementById('cargar-datos');

let indicePersonaActual = null;

/*
// Evento para manejar el envío del formulario
formPersona.addEventListener('submit', function(event) {
    event.preventDefault();
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    
    // Crear objeto persona
    const persona = {
        nombre,
        apellido,
        edad
    };

    if (indicePersonaActual !== null) {
        // Modificar persona existente
        modificarPersonaEnLocalStorage(indicePersonaActual, persona);
        indicePersonaActual = null;
    } else {
        // Guardar nueva persona
        guardarPersonaEnLocalStorage(persona);
    }

    // Limpiar formulario
    formPersona.reset();
    
    // Actualizar la lista de personas
    mostrarPersonas();
});

// Función para guardar persona en localStorage
function guardarPersonaEnLocalStorage(persona) {
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    personas.push(persona);
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Función para modificar persona en localStorage
function modificarPersonaEnLocalStorage(index, persona) {
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    personas[index] = persona;
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Función para mostrar personas en la lista
function mostrarPersonas() {
    listaPersonas.innerHTML = '';
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    personas.forEach((persona, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            ${persona.nombre} ${persona.apellido} - Edad: ${persona.edad}
            <button class="btn btn-danger btn-sm float-right" onclick="eliminarPersona(${index})"><i class="fas fa-trash-alt"></i> </button>
            <button class="btn btn-warning btn-sm float-right " onclick="cargarPersona(${index})">Modificar</button>
        `;
        listaPersonas.appendChild(li);
    });
}

// Función para cargar los datos de una persona en el formulario
function cargarPersona(index) {
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    const persona = personas[index];
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    indicePersonaActual = index;
}

// Función para eliminar una persona
function eliminarPersona(index) {
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    personas.splice(index, 1);
    localStorage.setItem('personas', JSON.stringify(personas));
    mostrarPersonas();
}

// Función para descargar los datos como un archivo JSON
async function descargarDatosComoJSON() {
    const personas = JSON.parse(localStorage.getItem('personas')) || [];
    const blob = new Blob([JSON.stringify(personas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para cargar datos desde un archivo JSON
function cargarDatosDesdeJSON(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contenido = e.target.result;
            const personas = JSON.parse(contenido);
            localStorage.setItem('personas', JSON.stringify(personas));
            mostrarPersonas();
        };
        reader.readAsText(file);
    }
}

// Eventos para guardar y cargar datos
guardarDatosBtn.addEventListener('click', descargarDatosComoJSON);
cargarDatosInput.addEventListener('change', cargarDatosDesdeJSON);

// Mostrar personas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPersonas);

*/

// ******************************************************************************* 

// ESTE ES EL MIMSO CODIGO DE ARRIBA PERO USANDO "sessionStorage" 
// se puede documentar el codigo de arriba y quitar la documentacion de este para usarlo.

// ********************************************************************************

// Evento para manejar el envío del formulario
formPersona.addEventListener('submit', function(event) {
    event.preventDefault();
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    
    // Crear objeto persona
    const persona = {
        nombre,
        apellido,
        edad
    };

    if (indicePersonaActual !== null) {
        // Modificar persona existente
        modificarPersonaEnSessionStorage(indicePersonaActual, persona);
        indicePersonaActual = null;
    } else {
        // Guardar nueva persona
        guardarPersonaEnSessionStorage(persona);
    }

    // Limpiar formulario
    formPersona.reset();
    
    // Actualizar la lista de personas
    mostrarPersonas();
});

// Función para guardar persona en sessionStorage
function guardarPersonaEnSessionStorage(persona) {
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    personas.push(persona);
    sessionStorage.setItem('personas', JSON.stringify(personas));
}

// Función para modificar persona en sessionStorage
function modificarPersonaEnSessionStorage(index, persona) {
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    personas[index] = persona;
    sessionStorage.setItem('personas', JSON.stringify(personas));
}

// Función para mostrar personas en la lista
function mostrarPersonas() {
    listaPersonas.innerHTML = '';
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    personas.forEach((persona, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            ${persona.nombre} ${persona.apellido} - Edad: ${persona.edad}
            <button class="btn btn-warning btn-sm float-right ml-2" onclick="cargarPersona(${index})">Modificar</button>
            <button class="btn btn-danger btn-sm float-right" onclick="eliminarPersona(${index})">Eliminar</button>
        `;
        listaPersonas.appendChild(li);
    });
}

// Función para cargar los datos de una persona en el formulario
function cargarPersona(index) {
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    const persona = personas[index];
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    indicePersonaActual = index;
}

// Función para eliminar una persona
function eliminarPersona(index) {
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    personas.splice(index, 1);
    sessionStorage.setItem('personas', JSON.stringify(personas));
    mostrarPersonas();
}

// Función para descargar los datos como un archivo JSON
async function descargarDatosComoJSON() {
    const personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    const blob = new Blob([JSON.stringify(personas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para cargar datos desde un archivo JSON
function cargarDatosDesdeJSON(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contenido = e.target.result;
            const personas = JSON.parse(contenido);
            sessionStorage.setItem('personas', JSON.stringify(personas));
            mostrarPersonas();
        };
        reader.readAsText(file);
    }
}

// Eventos para guardar y cargar datos
guardarDatosBtn.addEventListener('click', descargarDatosComoJSON);
cargarDatosInput.addEventListener('change', cargarDatosDesdeJSON);

// Mostrar personas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPersonas);
