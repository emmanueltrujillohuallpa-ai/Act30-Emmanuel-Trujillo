//EJERCICIO PRÁCTICO #2:
// Crear un carrito de compras dinámico con productos de una API
// 1. Utilizar fetch() para obtener productos desde una API.
// 2. Mostrar los productos en la página.
// 3. Agregar un botón "Añadir al carrito".
// 4. Utilizar LocalStorage para almacenar los productos.
// 5. Mostrar la cantidad de productos que hay en el carrito.



// URL de la API
const url = "https://fakestoreapi.com/products";

// Obtener elementos del HTML
const productos = document.getElementById("productos");
const mensaje = document.getElementById("mensaje");
const cantidad = document.getElementById("cantidad");
const listaCarrito = document.getElementById("listaCarrito");


// Recuperar el carrito desde LocalStorage

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];


// Actualizar la cantidad del carrito

function actualizarCantidad() {

    cantidad.textContent = carrito.length;
}


// Mostrar el carrito

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.textContent =
            "El carrito está vacío.";

        return;
    }


    carrito.forEach(function (producto) {

        const elemento = document.createElement("p");

        elemento.textContent =
            producto.title + " - $" + producto.price;

        listaCarrito.appendChild(elemento);
    });
}


// Agregar un producto al carrito

function agregarAlCarrito(producto) {

    carrito.push(producto);

    // Guardar el carrito en LocalStorage

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    // Actualizar la pantalla

    actualizarCantidad();

    mostrarCarrito();
}


// Mostrar los productos obtenidos de la API

function mostrarProductos(listaProductos) {

    productos.innerHTML = "";

    listaProductos.forEach(function (producto) {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">

            <h2>${producto.title}</h2>

            <p>$${producto.price}</p>

            <button class="agregar">
                Añadir al carrito
            </button>
        `;


        // Obtener el botón de la tarjeta

        const boton =
            tarjeta.querySelector(".agregar");


        // Evento para agregar el producto

        boton.addEventListener(
            "click",
            function () {

                agregarAlCarrito(producto);
            }
        );


        productos.appendChild(tarjeta);
    });
}


// Consumir la API

fetch(url)

    .then(function (respuesta) {

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener los productos"
            );
        }

        return respuesta.json();
    })

    .then(function (datos) {

        mensaje.textContent =
            "Productos cargados correctamente.";

        mostrarProductos(datos);
    })

    .catch(function (error) {

        mensaje.textContent =
            "Ocurrió un error al cargar los productos.";

        console.error(error);
    });


// Mostrar los datos guardados al cargar la página

actualizarCantidad();

mostrarCarrito();
