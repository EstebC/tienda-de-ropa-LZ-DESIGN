document.addEventListener('DOMContentLoaded', () => {
  console.log('La página ha cargado completamente');

  // Variables del modal
  const modal = document.getElementById('modal-agregar');
  const btnAgregar = document.querySelectorAll('.agregar-btn');
  const span = document.getElementsByClassName('close')[0];
  const totalProductos = document.getElementById('total-productos');
  const totalPrecio = document.getElementById('total-precio');

  // Abrir el modal al hacer clic en el emoji del carrito
  document.querySelectorAll('.carrito-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const producto = this.closest('.product-item')?.querySelector('h3')?.textContent || '';
      document.getElementById('producto').value = producto;
      modal.style.display = "block";
    });
  });

  // Cerrar el modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Cerrar el modal si se hace clic fuera del contenido
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Agregar producto al carrito
btnAgregar.forEach(btn => {
  btn.addEventListener('click', function() {
    const producto = document.getElementById('producto').value;
    const talla = document.getElementById('talla').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Obtener la ruta de la imagen correcta
    const imagenProducto = Array.from(document.querySelectorAll('.product-item'))
      .find(item => item.querySelector('h3').textContent === producto)
      .querySelector('img').src;

    // Crear un objeto de producto
    const productoCarrito = {
      producto,
      talla,
      cantidad,
      precio: 70, // Asumiendo que cada producto cuesta $70
      imagen: imagenProducto
    };

    // Obtener los productos del carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el nuevo producto al carrito
    carrito.push(productoCarrito);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`Producto: ${producto}\nTalla: ${talla}\nCantidad: ${cantidad} agregado al carrito.`);

    // Cerrar el modal
    modal.style.display = "none";

    // Actualizar total
    let currentTotalProductos = parseInt(totalProductos.textContent);
    let currentTotalPrecio = parseFloat(totalPrecio.textContent.replace('$', ''));
    totalProductos.textContent = currentTotalProductos + cantidad;
    totalPrecio.textContent = `$${(currentTotalPrecio + 70 * cantidad).toFixed(2)}`; // Asumiendo que cada producto cuesta $70
  });
});

  // Mostrar productos del carrito
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoProductos = document.getElementById('carrito-productos');

  let totalCantidad = 0;
  let totalCoste = 0;

  carrito.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('carrito-producto');
    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.producto}">
      <div class="producto-detalles">
        <h2>${producto.producto}</h2>
        <p>Talla: ${producto.talla}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Precio unitario: $${producto.precio}</p>
        <p>Total: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      </div>
      <button class="eliminar" onclick="eliminarProducto('${producto.producto}', '${producto.talla}')">Eliminar</button>
    `;
    carritoProductos.appendChild(productoDiv);

    totalCantidad += producto.cantidad;
    totalCoste += producto.precio * producto.cantidad;
  });

  totalProductos.textContent = totalCantidad;
  totalPrecio.textContent = `$${totalCoste.toFixed(2)}`;

  // Función para eliminar productos del carrito
  window.eliminarProducto = function(producto, talla) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => !(item.producto === producto  && item.talla === talla));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
   // Función para eliminar todo del carrito
   function eliminarTodo() {
   // Eliminar todos los productos del carrito en localStorage
   localStorage.removeItem('carrito');

  // Recargar la página para actualizar el carrito
  location.reload();
}

}

  };

  // Manejo del menú de categorías
  document.getElementById('hoodies-link').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la navegación por defecto

    fetch('catalogo.html') // Carga el contenido del catálogo
      .then(response => response.text())
      .then(data => {
        // Inserta el contenido del catálogo en el contenedor
        document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.error('Error al cargar el catálogo:', error));
  });
});





    