//variables

const listaProductos = document.getElementById('listaProductos');
const listaCarrito = document.getElementById('carritoContenedor');
const botonVaciar = document.getElementById('vaciarCarrito');
const precioTotal = document.getElementById('precioTotal');
const botonCarrito = document.getElementById('boton-carrito')
const contenedorModal = document.getElementsByClassName('contenedorModal')[0];
const carritoModal = document.getElementsByClassName('carritoModal')[0];
const cerrarCarrito = document.getElementById('cerrarCarrito');
const botonComprar = document.getElementById('realizarCompra')
const contadorCarrito = document.getElementById('contadorCarrito')
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
    sessionStorage.getItem('carrito') ? carrito = JSON.parse(sessionStorage.getItem('carrito')) : console.log("Error al cargar los productos");
});


//REALIZA PETICION A JSON POR LOS PRODUCTOS

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

    })

    .catch(error => console.error("Ayuda", error));

//funciones

const agregarCarrito = (productoId) => {
    const productoExiste = carrito.some(producto => producto.id === productoId);
    if(productoExiste) {
        const prod = carrito.map(producto => {
            if(producto.id === productoId){
                producto.cantidad++
                productoAgregado();
                verCarrito();
                contadorCarrito.innerText = carrito.length;
                
            }
        })

    } else {
        fetch(productos)
            .then(resp => resp.json())
            .then( (productos) => {
                const prod = productos.find((producto) => producto.id === productoId);
                carrito.push(prod);
                productoAgregado();
                verCarrito();
                contadorCarrito.innerText = carrito.length;  
            })
            .catch(error => console.error("Ayuda", error));
    };
};


const eliminarCarrito = (productoId) => {
    const prod = carrito.find((producto) => producto.id === productoId);
    const indice = carrito.indexOf(prod);
    carrito.splice(indice, 1);

    productoEliminado();
    verCarrito();
    contadorCarrito.innerText = carrito.length;
};

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

const productoAgregado = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado a carrito'
      })
}


const productoEliminado = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Producto eliminado de carrito'
      })
}


const realizarCompra = () => {

    Swal.fire({
        title: '¿Quiere confirmar la compra?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Gracias por su compra', '', 'success')
        }
      });
};

//botones


botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    sessionStorage.removeItem('carrito');
    contadorCarrito.innerText = carrito.length;
    verCarrito();
});

botonCarrito.addEventListener('click',() => {
    contenedorModal.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
});

contenedorModal.addEventListener('click', (e) => {
    contenedorModal.classList.toggle('modal-active')
});

carritoModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

botonComprar.addEventListener('click', () =>{
    realizarCompra();
    carrito.length = 0;
    contadorCarrito.innerText = carrito.length;
    sessionStorage.removeItem('carrito');
    verCarrito()

})