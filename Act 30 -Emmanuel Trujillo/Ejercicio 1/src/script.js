//EJERCICIO PRÁCTICO #1:
// Aplicar el consumo de API Fetch en tu proyecto personal
// 1. Elegir una API pública.
// 2. Usar fetch() para obtener los datos.
// 3. Mostrar los datos obtenidos en el proyecto.
// 4. Manejar posibles errores utilizando .catch().
// 5. Opcional: integrar los datos con alguna funcionalidad.
// URL de la API:
const url = "https://fakestoreapi.com/products";

// Obtener el contenedor donde se mostrarán los productos
const productos = document.getElementById("productos");
const mensaje = document.getElementById("mensaje");


// Función para mostrar los productos
function mostrarProductos(listaProductos) {

    productos.innerHTML = "";

    listaProductos.forEach(function (producto) {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">

            <h2>${producto.title}</h2>

            <p>Categoría: ${producto.category}</p>

            <p class="precio">$${producto.price}</p>
        `;

        productos.appendChild(tarjeta);
    });
}


// Consumir la API utilizando fetch()

fetch(url)

    // Convertir la respuesta a JSON
    .then(function (respuesta) {

        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos");
        }

        return respuesta.json();
    })

    // Recibir los productos
    .then(function (datos) {

        mensaje.textContent =
            "Productos cargados correctamente.";

        mostrarProductos(datos);
    })

    // Manejar errores
    .catch(function (error) {

        mensaje.textContent =
            "Ocurrió un error al cargar los productos.";

        console.error(error);
    });
