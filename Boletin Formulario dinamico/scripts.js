


document.getElementById('crear').addEventListener('click', function() {
    const mensaje = document.createElement('label');
    var inputNumero = document.getElementById('numero');

            // Obtener el valor del input
            var valorNumero = inputNumero.value;
            console.log(valorNumero)
    mensaje.textContent = '¡Has presionado el botón "Crear"!';
    
    const container = document.querySelector('.container');
    container.appendChild(mensaje);
});
