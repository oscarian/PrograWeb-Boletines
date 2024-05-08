// Arrays para almacenar personas, hijos y citas
let personas = [];
let hijos =[];
let citasMedicas =[];


// Funcion para agregar persona
const addPersonForm = document.getElementById('addPersonForm');
addPersonForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const cedula = this.cedula.value;
    const nombre = this.nombre.value;
    const direccion = this.direccion.value;
    const telefono = this.telefono.value;
    const fechaNacimiento = new Date(this.fecha_nacimiento.value);
    const horaNacimiento = new Date(`1970-01-01T${this.hora_nacimiento.value}`);
    

    // Calculo la edad
    const edad = calcularEdad(fechaNacimiento, horaNacimiento);

    const imagen = this.imagen.files[0];
    personas.push({ cedula, nombre, direccion, telefono, fechaNacimiento, horaNacimiento, edad });
    updateComboBoxes();
    this.reset();
});

//Cada vez que ingrese una persona nueva los combo box se actualizan
function updateComboBoxes() {
    const parentCedulaSelect = document.getElementById('parentCedula');
    const personCedulaSelect = document.getElementById('personCedula');

    // Limpio los boxes y los vuelvo a llenar con la cedula
    parentCedulaSelect.innerHTML = '';
    personCedulaSelect.innerHTML = '';

    personas.forEach(persona => {
        // Crear una opción para cada persona
        const option = document.createElement('option');
        option.text = persona.cedula;
        option.value = persona.cedula;

        parentCedulaSelect.add(option.cloneNode(true));
        personCedulaSelect.add(option);
    });
}



// Función para calcular la edad en años, meses, días y horas
function calcularEdad(fechaNacimiento, horaNacimiento) {
    const ahora = new Date();
    const diferencia = ahora - fechaNacimiento;
    const edad = {};
    edad.anios = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
    edad.meses = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    edad.dias = Math.floor((diferencia % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));
    edad.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return edad;
}

// funcion para Mostrar la edad en el formulario
addPersonForm.addEventListener('input', function() {
    const fechaNacimiento = new Date(this.fecha_nacimiento.value);
    const horaNacimiento = new Date(`1970-01-01T${this.hora_nacimiento.value}`);
    const edad = calcularEdad(fechaNacimiento, horaNacimiento);
    const edadSpan = document.getElementById('edad');
    edadSpan.textContent = `${edad.anios} años, ${edad.meses} meses, ${edad.dias} días, ${edad.horas} horas`;
});

// funcion para cargar la imagen y redimensionarla
const imagenInput = document.getElementById('imagen');
imagenInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // archivo de imagen seleccionado
    if (file) {
        const reader = new FileReader(); // Creo un objeto FileReader
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('canvasPreview');
                const ctx = canvas.getContext('2d');
                // Redimensiono la imagen
                ctx.drawImage(img, 0, 0, 100, 100);
            };
            img.src = event.target.result;
        };
        // Leer el archivo de imagen como una URL de datos (base64)
        reader.readAsDataURL(file);
    }
});

// Funcion para agregar hijo
const addChildForm = document.getElementById('addChildForm');
addChildForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const parentCedula = document.getElementById('parentCedula').value;
    const hijoCedula = this.hijoCedula.value;
    const hijoNombre = this.hijoNombre.value;
    const edadHijo = this.edadHijo.value;
    hijos.push({ parentCedula, hijoCedula, hijoNombre, edadHijo });
    this.reset();
});

// Funcion para agendar cita médica
const scheduleAppointmentForm = document.getElementById('scheduleAppointmentForm');
scheduleAppointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const personCedula = document.getElementById('personCedula').value;
    const fecha_cita = this.fecha_cita.value;
    const hora_cita = this.hora_cita.value;

    citasMedicas.push({ personCedula, fecha_cita, hora_cita });
    this.reset();

});


document.addEventListener("DOMContentLoaded", function() {
    // Abrir la pestaña por defecto al cargar la página
    document.getElementById("Ingreso").style.display = "block";

    window.openTab = function(tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "block";
    };

    

});


// Función para mostrar la información en las tablas 
function mostrarInformacion(option) {
    const tablaContainer = document.getElementById('tablaContainer');
    tablaContainer.innerHTML = ''; // Limpiar el contenido previo de la tabla

    const tabla = document.createElement('table');
    const thead = tabla.createTHead();
    const tbody = tabla.createTBody();
    const headerRow = thead.insertRow();

    /* ************************************
            muestro las personas  
    ************************************ */


    if (option === 'personas') {
        const encabezados = ['ID', 'Nombre', 'Dirección', 'Teléfono', 'Fecha de Nacimiento', 'Hora de Nacimiento', 'Edad'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            headerRow.appendChild(th);
        });

        // Llenar la tabla con datos de personas
        personas.forEach(persona => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${persona.cedula}</td>
                             <td>${persona.nombre}</td>
                             <td>${persona.direccion}</td>
                             <td>${persona.telefono}</td>
                             <td>${persona.fechaNacimiento.toLocaleDateString()}</td>
                             <td>${persona.horaNacimiento.toLocaleTimeString()}</td>
                             <td>${persona.edad.anios} años, ${persona.edad.meses} meses, ${persona.edad.dias} días, ${persona.edad.horas} horas</td>`;
        });



        /* ************************************
            muestro los hijos 
    ************************************ */


    } else if (option === 'hijos') {
        const encabezados = ['ID Padre', 'ID Hijo', 'Nombre', 'Edad'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            headerRow.appendChild(th);
        });

        // Llenar la tabla con datos de hijos
        hijos.forEach(hijo => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${hijo.parentCedula}</td>
                             <td>${hijo.hijoCedula}</td>
                             <td>${hijo.hijoNombre}</td>
                             <td>${hijo.edadHijo}</td>`;
        });



        /* ************************************
            muestro las citas medicas  
    ************************************ */


    } else if (option === 'citas') {
        const encabezados = ['ID', 'Fecha', 'Hora'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            headerRow.appendChild(th);
        });

        // Llenar la tabla con datos de citas médicas
        citasMedicas.forEach(cita => {
            const row = tbody.insertRow();
            row.innerHTML = `<td>${cita.personCedula}</td>
                             <td>${cita.fecha}</td>
                             <td>${cita.hora}</td>`;
        });
    }

    tablaContainer.appendChild(tabla);
}

// Event listener para el cambio en el combo box de visualización
document.getElementById('seleccion').addEventListener('change', function() {
    const option = this.value;
    mostrarInformacion(option);
});


