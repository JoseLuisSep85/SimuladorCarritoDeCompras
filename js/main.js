//variables

const listaProductos = document.getElementById('listaProductos');
const productosBuscados = document.getElementById('productosBuscados');
const listaCarrito = document.getElementById('listaCarrito');
const botonVaciar = document.getElementById('vaciarCarrito');
const precioTotal = document.getElementById('precioTotal');
const botonBuscar = document.getElementById('botonBuscar');
const productos = "../js/json/productos.json";
let carrito = [];


//clase constructora de productos

class Producto {
    constructor(id, nombre, precio, imagen, cantidad, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    };
};


document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.getItem('carrito') ? carrito = JSON.parse(sessionStorage.getItem('carrito')) : console.error("Error al cargar los productos");
    verCarrito();
});


//agrega todos los elementos del array productos al DOM

fetch(productos)
    .then(resp => resp.json())
    .then( (productos) => {

        productos.forEach((producto) => {

            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
            <img class= "producto_imagen" src = ${producto.imagen} alt="${producto.nombre}">
            <h4 class= "productoTitulo">${producto.nombre}</h4>
            <p class= "productoDescripcion">${producto.descripcion}</p>
            <p class= "producto_precio">Precio: $${producto.precio.toLocaleString('es-CL')}</p>
            <button id= "agregar${producto.id}" class= "boton_agregar">Agregar</button>
            `
            listaProductos.appendChild(div);
            
            const botonAgregar = document.getElementById(`agregar${producto.id}`);
            botonAgregar.addEventListener('click',() => {
            agregarCarrito(producto.id);
            
            });
        });

    });

//funciones

const verCarrito = () => {
    listaCarrito.innerHTML = "";

    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.className = ("carrito");
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio:$ ${producto.precio.toLocaleString('es-CL')}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button onclick = "eliminarCarrito(${producto.id})" class = "boton_eliminar">Eliminar</button>
        `
        listaCarrito.appendChild(div);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    });
    
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0).toLocaleString('es-CL');
};


const agregarCarrito = (productoId) => {
    const productoExiste = carrito.some(producto => producto.id === productoId);
    if(productoExiste) {
        const prod = carrito.map(producto => {
            if(producto.id === productoId){
                producto.cantidad++
            }
        })
    } else {
        const prod = productos.find((producto) => producto.id === productoId);
        carrito.push(prod);    
    };
    verCarrito();
};


const eliminarCarrito = (productoId) => {
    const prod = carrito.find((producto) => producto.id === productoId);
    const indice = carrito.indexOf(prod);
    carrito.splice(indice, 1);

    verCarrito();
};


const buscarProducto = () => {
    const input = document.getElementById('buscar').value
    const palabraBuscar = input.trim().toUpperCase();
    const resultado = productos.filter((producto) => producto.nombre.toUpperCase().includes(palabraBuscar));

    productosBuscados.innerHTML = "";
   
    if(resultado.length > 0) {
        resultado.forEach((producto) => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
            <img class= "producto_imagen" src = ${producto.imagen} alt="${producto.nombre}">
            <h4 class= "productoTitulo">${producto.nombre}</h4> 
            <p class= "productoDescripcion">${producto.descripcion}</p>
            <p class= "producto_precio">Precio: $${producto.precio.toLocaleString('es-CL')}</p>
            <button id= "agregar${producto.id}" class= "boton_agregar">Agregar</button>
            `
            productosBuscados.appendChild(div);
            
            const botonAgregar = document.getElementById(`agregar${producto.id}`);
            botonAgregar.addEventListener('click',() => {
               agregarCarrito(producto.id);
            });
        })    
    }
}

//botones

botonBuscar.addEventListener('click', () => {
    buscarProducto()
});

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    verCarrito();
});
