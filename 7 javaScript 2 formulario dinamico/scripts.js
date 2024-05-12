document.getElementById('crear').addEventListener('click', function() {
    const inputNumero = document.getElementById('numero');
    const valorNumero = parseInt(inputNumero.value);
    // Listas para almacenar las preguntas
    const preguntasTexto = [];
    const preguntasVF = [];
    const preguntasOpcionMultiple = [];
    
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Limpiar cualquier pregunta previa
    
    for (let i = 0; i < valorNumero; i++) {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.classList.add('pregunta');

        const preguntaLabel = document.createElement('label');
        preguntaLabel.textContent = `Pregunta ${i + 1}: `;
        preguntaDiv.appendChild(preguntaLabel);

        const tipoSelect = document.createElement('select');
        tipoSelect.name = `pregunta_${i + 1}_tipo`;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un tipo';
        tipoSelect.appendChild(defaultOption);

        const textoOption = document.createElement('option');
        textoOption.value = 'texto';
        textoOption.textContent = 'Texto';
        tipoSelect.appendChild(textoOption);

        const verdaderoFalsoOption = document.createElement('option');
        verdaderoFalsoOption.value = 'verdadero_falso';
        verdaderoFalsoOption.textContent = 'Verdadero/Falso';
        tipoSelect.appendChild(verdaderoFalsoOption);

        const opcionMultipleOption = document.createElement('option');
        opcionMultipleOption.value = 'opcion_multiple';
        opcionMultipleOption.textContent = 'Opción Múltiple';
        tipoSelect.appendChild(opcionMultipleOption);

        preguntaDiv.appendChild(tipoSelect);
        
        tipoSelect.addEventListener('change', function() {
            // Eliminamos cualquier campo de texto previamente creado
            if (preguntaDiv.querySelector('.opcion')) {
                preguntaDiv.removeChild(preguntaDiv.querySelector('.opcion'));
            }
        
            const opcionSeleccionada = tipoSelect.value;
        
            const opcionDiv = document.createElement('div');
            opcionDiv.classList.add('opcion','fila');
            
            if (opcionSeleccionada === 'texto') {
                // Creamos labels para los campos de texto
                const preguntaLabel = document.createElement('label');
                preguntaLabel.textContent = 'Ingrese la pregunta:';
                opcionDiv.appendChild(preguntaLabel);

                const preguntaInput = document.createElement('input');
                preguntaInput.type = 'text';
                opcionDiv.appendChild(preguntaInput);

                const respuestaLabel = document.createElement('label');
                respuestaLabel.textContent = 'Ingrese la respuesta:';
                opcionDiv.appendChild(respuestaLabel);

                const respuestaInput = document.createElement('input');
                respuestaInput.type = 'text';
                opcionDiv.appendChild(respuestaInput);

                
            } else if (opcionSeleccionada === 'verdadero_falso') {
                // Implementación para Verdadero/Falso
                const preguntaLabel = document.createElement('label');
                preguntaLabel.textContent = 'Ingrese la pregunta:';
                opcionDiv.appendChild(preguntaLabel);

                const preguntaInput = document.createElement('input');
                preguntaInput.type = 'text';
                preguntaInput.placeholder = 'Escribe tu pregunta';
                opcionDiv.appendChild(preguntaInput);

                const respuestaLabel = document.createElement('label');
                respuestaLabel.textContent = 'Seleccione la respuesta:';
                opcionDiv.appendChild(respuestaLabel);

                const respuestaSelect = document.createElement('select');
                respuestaSelect.name = `pregunta_${i + 1}_respuesta`;
                respuestaSelect.innerHTML = `
                    <option value="" disabled selected>Selecciona una respuesta</option>
                    <option value="verdadero">Verdadero</option>
                    <option value="falso">Falso</option>
                `;
                opcionDiv.appendChild(respuestaSelect);

                
            } else if (opcionSeleccionada === 'opcion_multiple') {
                preguntaDiv.classList.add('opcion-multiple'); // Agregar la clase para identificar las preguntas de opción múltiple

                // Implementación para Opción Múltiple
                const preguntaLabel = document.createElement('label');
                preguntaLabel.textContent = 'Ingrese la pregunta:';
                opcionDiv.appendChild(preguntaLabel);
            
                const preguntaInput = document.createElement('input');
                preguntaInput.type = 'text';
                preguntaInput.placeholder = 'Escribe tu pregunta';
                opcionDiv.appendChild(preguntaInput);
            
                const opcionesDiv = document.createElement('div');
                opcionesDiv.classList.add('opciones');
                opcionDiv.appendChild(opcionesDiv);
            
                const agregarOpcionBtn = document.createElement('button');
                agregarOpcionBtn.textContent = 'Agregar Opción';
                opcionDiv.appendChild(agregarOpcionBtn);
            
                agregarOpcionBtn.addEventListener('click', function() {
                    const opcionContainer = document.createElement('div');
                    opcionContainer.classList.add('opcion-container');
                    opcionContainer.style.borderTop = '1px solid green';
            
                    const opcionCorrectaSelect = document.createElement('select');
                    const opcionInput = document.createElement('input');
                    opcionInput.type = 'text';
            
                    const opcionLabel = document.createElement('label');
                    opcionLabel.textContent = 'Opción:';
                    opcionContainer.appendChild(opcionLabel);
                    opcionContainer.appendChild(opcionInput);
            
                    const correctaLabel = document.createElement('label');
                    correctaLabel.textContent = 'La opción es?:';
                    opcionContainer.appendChild(correctaLabel);
                    opcionContainer.appendChild(opcionCorrectaSelect);
            
                    const opcionCorrectaTrue = document.createElement('option');
                    opcionCorrectaTrue.textContent = 'Correcta';
                    opcionCorrectaTrue.value = 'true';
            
                    const opcionCorrectaFalse = document.createElement('option');
                    opcionCorrectaFalse.textContent = 'Incorrecta';
                    opcionCorrectaFalse.value = 'false';
            
                    opcionCorrectaSelect.appendChild(opcionCorrectaTrue);
                    opcionCorrectaSelect.appendChild(opcionCorrectaFalse);
                    opcionCorrectaSelect.selectedIndex = -1;
            
                    opcionesDiv.appendChild(opcionContainer);
                });
            }
        
            preguntaDiv.appendChild(opcionDiv);
        });
        
        
        container.appendChild(preguntaDiv);
    }
    const aceptarButton = document.createElement('button');
    aceptarButton.textContent = 'Aceptar';
    
    
    
    aceptarButton.addEventListener('click', function() {
        const divPreguntas = container.querySelectorAll('.pregunta');
    
        divPreguntas.forEach((preguntaDiv, index) => {
            const tipoSelect = preguntaDiv.querySelector('select');
            const tipoSeleccionado = tipoSelect.value;
            const preguntaInput = preguntaDiv.querySelector('input[type="text"]');
    
            if (tipoSeleccionado === 'texto') {
                const respuestaInput = preguntaDiv.querySelector('input[type="text"]');
                preguntasTexto.push({ pregunta: preguntaInput.value, respuesta: respuestaInput.value });
            } else if (tipoSeleccionado === 'verdadero_falso') {
                const respuestaSelect = preguntaDiv.querySelector('select');
                const respuestaSeleccionada = respuestaSelect.value;
                preguntasVF.push({ pregunta: preguntaInput.value, respuesta: respuestaSeleccionada });
            } else if (tipoSeleccionado === 'opcion_multiple') {
                const opcionesDiv = preguntaDiv.querySelector('.opciones');
                const opcionContainers = opcionesDiv.querySelectorAll('.opcion-container');
                const opciones = [];
    
                opcionContainers.forEach(opcionContainer => {
                    const opcionInput = opcionContainer.querySelector('input[type="text"]');
                    const opcionCorrectaSelect = opcionContainer.querySelector('select');
                    const opcionCorrecta = opcionCorrectaSelect.value === 'true';
                    opciones.push({ texto: opcionInput.value, correcta: opcionCorrecta });
                });
    
                preguntasOpcionMultiple.push({ pregunta: preguntaInput.value, opciones: opciones });
            }
        });

        // Limpiar la pantalla
        container.innerHTML = '';

        // Mostrar las preguntas guardadas
        const preguntasParrafo = document.createElement('p');
        preguntasParrafo.textContent = 'Preguntas:';
        container.appendChild(preguntasParrafo);

        preguntasTexto.forEach((pregunta, index) => {
            const preguntaParrafo = document.createElement('p');
            preguntaParrafo.textContent = `. Pregunta: ${pregunta.pregunta}, Respuesta: ${pregunta.respuesta}`;
            container.appendChild(preguntaParrafo);
        });

        preguntasVF.forEach((pregunta, index) => {
            const preguntaParrafo = document.createElement('p');
            preguntaParrafo.textContent = `. Pregunta: ${pregunta.pregunta}, Respuesta: ${pregunta.respuesta}`;
            container.appendChild(preguntaParrafo);
        });

        preguntasOpcionMultiple.forEach((pregunta, index) => {
            const preguntaParrafo = document.createElement('p');
            preguntaParrafo.textContent = `. Pregunta: ${pregunta.pregunta}`;

            const opcionesCorrectas = pregunta.opciones.filter(opcion => opcion.correcta).map(opcion => opcion.texto);
            const opcionesCorrectasTexto = opcionesCorrectas.join(', ');

            const opcionesParrafo = document.createElement('p');
            opcionesParrafo.textContent = `Opciones correctas: ${opcionesCorrectasTexto}`;

            container.appendChild(preguntaParrafo);
            container.appendChild(opcionesParrafo);

        });
    });

    container.appendChild(aceptarButton);
});