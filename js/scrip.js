
const carrito = [];
const tablaCarrito = document.querySelector("#carrito tbody");
const totalSpan = document.querySelector("#total");

// Función para agregar productos al carrito
document.querySelectorAll(".agregar-carrito").forEach(button => {
    button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);

        // verifica si esta en el carrito
        const productoExistente = carrito.find(p => p.id === id);
        if (productoExistente) {
            
            productoExistente.cantidad++;
        } else {
            
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        
        actualizarCarrito();
    });
});

// actualiza la tabla del carrito
function actualizarCarrito() {
    
    tablaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {
        
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
            <td><button class="eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
        `;

        
        tablaCarrito.appendChild(fila);

        
        total += producto.precio * producto.cantidad;
    });

    
    totalSpan.textContent = total.toFixed(2);

    
    agregarEventosEliminar();
}

// eliminar productos
function agregarEventosEliminar() {
    document.querySelectorAll(".eliminar-producto").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;

            // Encontrar el índice del producto a eliminar
            const index = carrito.findIndex(p => p.id === id);
            if (index !== -1) {
                carrito.splice(index, 1); // Eliminar producto del array
                actualizarCarrito(); // Actualizar la tabla del carrito
            }
        });
    });
}
