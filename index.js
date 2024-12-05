const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para la página de catálogo
app.get('/catalogo', (req, res) => {
  res.sendFile(__dirname + '/public/catalogo.html');
});

// Ruta para la página del carrito
app.get('/carrito', (req, res) => {
  res.sendFile(__dirname + '/public/carrito.html');
});

// Ruta para la página de perfil
app.get('/perfil', (req, res) => {
  res.sendFile(__dirname + '/public/perfil.html');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
// Función para cargar el encabezado
function loadHeader() {
  fetch('header.html') // Cargar el archivo header.html
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el encabezado');
      }
      return response.text(); // Leer el contenido del archivo
    })
    .then(data => {
      document.getElementById('header-container').innerHTML = data; // Insertar en el contenedor
    })
    .catch(error => console.error('Error:', error));
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadHeader);
