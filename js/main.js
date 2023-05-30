//variables

const listaProductos = document.getElementById('listaProductos');
const productosBuscados = document.getElementById('productosBuscados');
const listaCarrito = document.getElementById('listaCarrito');
const botonVaciar = document.getElementById('vaciarCarrito');
const precioTotal = document.getElementById('precioTotal');
const botonBuscar = document.getElementById('botonBuscar')
const productos = [];
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

//objetos agregados en array productos

productos.push(new Producto(1, "Apple MacBook Pro 14 M1", 1499000, "../img/mbp14.jpg", 1, "Apple MacBook Pro 14 - Chip M1 Pro CPU 8 núcleos - GPU 14 núcleos - 16 GB RAM - 512GB SSD"));
productos.push(new Producto(2, "Apple MacBook Pro 16 M1", 1999000, "../img/mbp16.jpg", 1, "Apple MacBook Pro 16.2 - Chip M1 Pro CPU 10 núcleos - GPU 16 núcleos - 16 GB RAM - 512GB SSD"));
productos.push(new Producto(3, "Apple MacBook Air", 799000, "../img/mbair.jpg", 1, "Apple MacBook Air 13 - Chip M1 CPU 8 núcleos - GPU 7 núcleos - 8GB RAM - 256 GB SSD"));
productos.push(new Producto(4, "Samsung Galaxy Book 3 Ultra", 2499000, "../img/samsung_galaxyb3pro.jpg", 1, "Notebook Galaxy Book 3 Ultra - Intel Core i7 - 16 GB RAM - 1TB SSD - GeForce RTX 4050"));
productos.push(new Producto(5, "Samsung Galaxy Book 3 Pro", 1599000, "../img/samsung_galaxyb3pro.jpg", 1, "Notebook Galaxy Book 3 Pro 14 - Intel Core i7 - 16 GB RAM - 512GB SSD - Intel Xe Series"));
productos.push(new Producto(6, "Xbox Serie S", 249000, "../img/xboxSerieS.jpg", 1, "Consola Xbox Series S - 512GB SSD - Procesador AMD - Conectividad WIFI"));
productos.push(new Producto(7, "Xbox Serie X", 549000, "../img/xboxSerieX.jpg", 1, "Consola Xbox Series X 1TB SSD - Procesador AMD Ryzen"));
productos.push(new Producto(8, "PlayStation 5", 649000, "../img/PlayStation5.jpg", 1, "PS5 Consola Playstation 5 Sony Standard 1115 Fifa 23"));
productos.push(new Producto(9, "Nintendo Switch", 349000, "../img/NintendoSwitch.jpg", 1, "Consola Nintendo Switch Lt2 - 32GB - Nvidia Tegra"));
productos.push(new Producto(10, "Nintendo Switch Oled", 449000, "../img/NintendoSwitchOled.jpg", 1, "Consola Nintendo Switch Modelo OLED Neon"));
productos.push(new Producto(11, "Apple Iphone 14 Pro Max", 1199000, "../img/Iphone14ProMax.jpg", 1, "Apple iPhone 14 Pro Max 256 GB - 6.7 pulgadas - 6GB RAM"));
productos.push(new Producto(12, "Apple Iphone 14 Pro", 1149000, "../img/Iphone14Pro.jpg", 1, "Apple iPhone 14 Pro 256 GB - 6.1 pulgadas - 6GB RAM"));
productos.push(new Producto(13, "Apple Iphone 14", 799000, "../img/Iphone14.jpg", 1, "Apple iPhone 14 256 GB - 6.1 pulgadas - 6GB RAM"));
productos.push(new Producto(14, "Samsung Galaxy S23 Ultra", 1079000, "../img/S23Ultra.jpg", 1, "Smartphone Samsung Galaxy S23 Ultra - 256GB - 5G"));
productos.push(new Producto(15, "Samsung Galaxy S23", 799000, "../img/S23.jpg", 1, "Smartphone Samsung Galaxy S23 - 256GB - 5G"));
    


document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.getItem('carrito') ? carrito = JSON.parse(sessionStorage.getItem('carrito')) : console.error("Error al cargar los productos");
    verCarrito();
});


//agrega todos los elementos del array productos al DOM

const tarjetasProductos = productos.forEach((producto) => {
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
s
