// Selección de elementos del DOM
const formPersona = document.getElementById('form-persona');
const listaPersonas = document.getElementById('lista-personas');
const guardarDatosBtn = document.getElementById('guardar-datos');
const cargarDatosInput = document.getElementById('cargar-datos');
const cargarDatosBtn = document.getElementById('cargar-datos-btn');
const mostrarLocalBtn = document.getElementById('mostrar-local');
const mostrarSessionBtn = document.getElementById('mostrar-session');
const mensajeDiv = document.getElementById('mensaje');

let indicePersonaActual = null;

// Evento para manejar el envío del formulario
formPersona.addEventListener('submit', function(event) {
    event.preventDefault();
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const storageOption = document.querySelector('input[name="storage"]:checked').value;

    // Crear objeto persona
    const persona = { nombre, apellido, edad };

    if (indicePersonaActual !== null) {
        // Modificar persona existente
        modificarPersona(indicePersonaActual, persona, storageOption);
        indicePersonaActual = null;
    } else {
        // Guardar nueva persona
        guardarPersona(persona, storageOption);
    }

    // Mostrar mensaje de confirmación
    mensajeDiv.innerHTML = `<div class="alert alert-success">Persona añadida correctamente.</div>`;
    setTimeout(() => mensajeDiv.innerHTML = '', 3000); // Eliminar mensaje después de 3 segundos

    // Limpiar formulario y lista de personas
    formPersona.reset();
    listaPersonas.innerHTML = '';
});

// Función para guardar persona
function guardarPersona(persona, storageOption) {
    let personas = getPersonas(storageOption);
    personas.push(persona);
    setPersonas(personas, storageOption);
}

// Función para modificar persona
function modificarPersona(index, persona, storageOption) {
    let personas = getPersonas(storageOption);
    personas[index] = persona;
    setPersonas(personas, storageOption);
}

// Función para obtener personas del storage
function getPersonas(storageOption) {
    let personas = storageOption === 'local' 
        ? JSON.parse(localStorage.getItem('personas')) 
        : JSON.parse(sessionStorage.getItem('personas'));
    return personas || [];
}

// Función para guardar personas en el storage
function setPersonas(personas, storageOption) {
    if (storageOption === 'local') {
        localStorage.setItem('personas', JSON.stringify(personas));
    } else {
        sessionStorage.setItem('personas', JSON.stringify(personas));
    }
}

// Función para mostrar personas de localStorage
function mostrarPersonasLocal() {
    listaPersonas.innerHTML = '';
    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    if (personas.length === 0) {
        listaPersonas.innerHTML = '<li class="list-group-item">LocalStorage está vacío.</li>';
    } else {
        personas.forEach((persona, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                ${persona.nombre} ${persona.apellido} - Edad: ${persona.edad}
                <button class="btn btn-danger btn-sm float-right" onclick="eliminarPersona(${index}, 'local')"><i class="fas fa-trash-alt"></i> </button>
                <button class="btn btn-warning btn-sm float-right " onclick="cargarPersona(${index}, 'local')">Modificar</button>
            `;
            listaPersonas.appendChild(li);
        });
    }
}

// Función para mostrar personas de sessionStorage
function mostrarPersonasSession() {
    listaPersonas.innerHTML = '';
    let personas = JSON.parse(sessionStorage.getItem('personas')) || [];
    if (personas.length === 0) {
        listaPersonas.innerHTML = '<li class="list-group-item">SessionStorage está vacío.</li>';
    } else {
        personas.forEach((persona, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                ${persona.nombre} ${persona.apellido} - Edad: ${persona.edad}
                <button class="btn btn-danger btn-sm float-right" onclick="eliminarPersona(${index}, 'session')"><i class="fas fa-trash-alt"></i> </button>
                <button class="btn btn-warning btn-sm float-right " onclick="cargarPersona(${index}, 'session')">Modificar</button>
            `;
            listaPersonas.appendChild(li);
        });
    }
}

// Función para cargar los datos de una persona en el formulario
function cargarPersona(index, storageOption) {
    let personas = getPersonas(storageOption);
    const persona = personas[index];
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    document.querySelector(`input[value=${storageOption}]`).checked = true;
    indicePersonaActual = index;
}

// Función para eliminar una persona
function eliminarPersona(index, storageOption) {
    let personas = getPersonas(storageOption);
    personas.splice(index, 1);
    setPersonas(personas, storageOption);
    if (storageOption === 'local') {
        mostrarPersonasLocal();
    } else {
        mostrarPersonasSession();
    }
}

// Función para descargar los datos como un archivo JSON
function descargarDatosComoJSON() {
    const personas = JSON.parse(localStorage.getItem('personas')) || [];
    const blob = new Blob([JSON.stringify(personas, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'personas.json';
    a.click();
    URL.revokeObjectURL(a.href);
}

// Función para cargar datos desde un archivo JSON
function cargarDatosDesdeJSON(event) {
    console.log(localStorage)
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contenido = e.target.result;
            const personas = JSON.parse(contenido);
            localStorage.clear();
            localStorage.setItem('personas', JSON.stringify(personas));
            mostrarPersonasLocal();
        };
        reader.readAsText(file);
    }else{
        console.log("no entro")
    }
    console.log(localStorage)
    // Reiniciar el input de archivo después de leer el archivo
    event.target.value = null;
}


// Eventos para guardar y cargar datos
guardarDatosBtn.addEventListener('click', descargarDatosComoJSON);
cargarDatosInput.addEventListener('change', cargarDatosDesdeJSON);
cargarDatosBtn.addEventListener('click', () => cargarDatosInput.click());
mostrarLocalBtn.addEventListener('click', mostrarPersonasLocal);
mostrarSessionBtn.addEventListener('click', mostrarPersonasSession);
