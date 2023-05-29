
const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const botonVaciar = document.getElementById('vaciarCarrito');
const precioTotal = document.getElementById('precioTotal');
let carrito = [];

const productos = [
    {id:1, nombre: "Apple MacBook Pro 14 M1", precio: 1499000, imagen: "../img/mbp14.jpg", cantidad:1, descripcion: "Apple MacBook Pro 14 - Chip M1 Pro CPU 8 núcleos - GPU 14 núcleos - 16 GB RAM - 512GB SSD"},
    {id:2, nombre: "Apple MacBook Pro 16 M1", precio: 1999000, imagen: "../img/mbp16.jpg", cantidad:1, descripcion: "Apple MacBook Pro 16.2 - Chip M1 Pro CPU 10 núcleos - GPU 16 núcleos - 16 GB RAM - 512GB SSD"},
    {id:3, nombre: "Apple MacBook Air", precio: 799000, imagen: "../img/mbair.jpg", cantidad:1, descripcion: "Apple MacBook Air 13 - Chip M1 CPU 8 núcleos - GPU 7 núcleos - 8GB RAM - 256 GB SSD)"},
    {id:4, nombre: "Samsung Galaxy Book 3 Ultra", precio: 2499000, imagen: "../img/samsung_galaxyb3pro.jpg", cantidad:1, descripcion: "Notebook Galaxy Book 3 Ultra - Intel Core i7 - 16 GB RAM - 1TB SSD - GeForce RTX 4050"},
    {id:5, nombre: "Samsung Galaxy Book 3 Pro", precio: 1599000, imagen: "../img/samsung_galaxyb3pro.jpg", cantidad:1, descripcion: "Notebook Galaxy Book 3 Pro 14 - Intel Core i7 - 16 GB RAM - 512GB SSD - Intel Xe Series"},
    {id:6, nombre: "Xbox Serie S", precio: 249000, imagen: "../img/xboxSerieS.jpg", cantidad:1, descripcion: "Consola Xbox Series S - 512GB SSD - Procesador AMD - Conectividad WIFI"},
    {id:7, nombre: "Xbox Serie X", precio: 549000, imagen: "../img/xboxSerieX.jpg", cantidad:1, descripcion: "Consola Xbox Series X 1TB SSD - Procesador AMD Ryzen"},
    {id:8, nombre: "PlayStation 5", precio: 649000, imagen: "../img/PlayStation5.jpg", cantidad:1, descripcion: "PS5 Consola Playstation 5 Sony Standard 1115 Fifa 23"},
    {id:9, nombre: "Nintendo Switch", precio: 349000, imagen: "../img/NintendoSwitch.jpg", cantidad:1, descripcion: "Consola Nintendo Switch Lt2 - 32GB - Nvidia Tegra"},
    {id:10, nombre: "Nintendo Switch Oled", precio: 449000, imagen: "../img/NintendoSwitchOled.jpg", cantidad:1, descripcion: "Consola Nintendo Switch Modelo OLED Neon"},
    {id:11, nombre: "Apple Iphone 14 Pro Max", precio: 1199000, imagen: "../img/Iphone14ProMax.jpg", cantidad:1, descripcion: "Apple iPhone 14 Pro Max 256 GB - 6.7 pulgadas - 6GB RAM"},
    {id:12, nombre: "Apple Iphone 14 Pro", precio: 1149000, imagen: "../img/Iphone14Pro.jpg", cantidad:1, descripcion: "Apple iPhone 14 Pro 256 GB - 6.1 pulgadas - 6GB RAM"},
    {id:13, nombre: "Apple Iphone 14", precio: 799000, imagen: "../img/Iphone14.jpg", cantidad:1, descripcion: "Apple iPhone 14 256 GB - 6.1 pulgadas - 6GB RAM"},
    {id:14, nombre: "Samsung Galaxy S23 Ultra", precio: 1079000, imagen: "../img/S23Ultra.jpg", cantidad:1, descripcion: "Smartphone Samsung Galaxy S23 Ultra - 256GB - 5G"},
    {id:15, nombre: "Samsung Galaxy S23", precio: 799000, imagen: "../img/S23.jpg", cantidad:1, descripcion: "Smartphone Samsung Galaxy S23 - 256GB - 5G"},
    
];

document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem('carrito')) {
        carrito = JSON.parse(sessionStorage.getItem('carrito'));
    }
    verCarrito();
});


productos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
    <img class="producto_imagen" src = ${producto.imagen} alt="${producto.nombre}">
    <h4 class="productoTitulo">${producto.nombre}</h4>
    <p class="productoDescripcion">${producto.descripcion}</p>
    <p class="producto_precio">Precio: $${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton_agregar">Agregar</button>
    `
    listaProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener('click', () => {
        agregarCarrito(producto.id)
    });
});

const agregarCarrito = (productoId) => {
    const existeProducto = carrito.some(producto => producto.id === productoId);
    if(existeProducto){
        const producto = carrito.map(producto => {
            if(producto.id === productoId){
                producto.cantidad++
            }
        });
    } else {
    const itemProducto = productos.find((producto) => producto.id === productoId);
    carrito.push(itemProducto);
    };
    verCarrito();
};

const eliminarCarrito = (productoId) => {
    const itemProducto = carrito.find((producto) => producto.id === productoId);
    const indice = carrito.indexOf(itemProducto);
    carrito.splice(indice, 1);
    verCarrito();
};

botonVaciar.addEventListener('click', () => {
    carrito.length = "";
    verCarrito();
});

const verCarrito = () => {
    listaCarrito.innerHTML = "";

    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.className = ("carrito");
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio:$ ${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button onclick = "eliminarCarrito(${producto.id})" class = "boton_eliminar">Eliminar</button>
        `
        listaCarrito.appendChild(div);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

    });

    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

};
 
