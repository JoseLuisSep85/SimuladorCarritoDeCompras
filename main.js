
// clase constructora, con esta clase crearemos objetos para agregar a nuestro carrito

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}


// objeto carrito con funciones para manejar el carrito

const carrito = {
    productos : [],

    agregarProducto : function (producto) {
        this.productos.push(producto)
    },

    mostrarCarrito: function () {
        console.log("Carrito de compras");
        this.productos.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - Precio $${producto.precio} `);
        });    
    },

    calcularTotal: function () {
        let total = 0;
        this.productos.forEach((producto) => {
            total += producto.precio;
        });
        console.log("El total es $" + total);
        
    },

    vaciarCarrito: function () {
        this.productos = [];
        console.log("Has vaciado el carrito");
        
    }

};

//listado de productos que se pueden agregar al carrito

let producto1 = new Producto(1, "Apple MacBook Pro 14 M1", 1499000);
let producto2 = new Producto(2, "Apple MacBook Pro 16 M1", 1999000);
let producto3 = new Producto(3, "Apple MacBook air M1", 799000);
let producto4 = new Producto(4, "Samsung Galaxy Book 3 Ultra", 2499000);
let producto5 = new Producto(5, "Samsung Galaxy Book 3 Pro", 1599000);
let producto6 = new Producto(6, "Xbox Serie S", 249000);
let producto7 = new Producto(7, "Xbox Serie X", 549000);
let producto8 = new Producto(8, "PlayStation 5", 649000);
let producto9 = new Producto(9, "Nintendo Switch", 349000);
let producto10 = new Producto(10, "Nintendo Switch OLed", 449000);
let producto11 = new Producto(11, "Apple Iphone 14 Pro Max", 1199900);
let producto12 = new Producto(12, "Apple Iphone 14 Pro", 1149900);
let producto13 = new Producto(13, "Apple Iphone 14", 799900);
let producto14 = new Producto(14, "Samsung Galaxy S23 Ultra", 1079900);
let producto15 = new Producto(15, "Samsung Galaxy S23", 799900);



let nuevoProducto;

do {
    
    nuevoProducto = parseInt(prompt("¿Qué producto quieres agregar al carrito (Ingresar el número del ID)\n\n"));
    
    if (Number.isInteger(nuevoProducto)) {

        switch (nuevoProducto) {

            case 1: carrito.agregarProducto(producto1);
                
                break;
            
            case 2: carrito.agregarProducto(producto2);
                
                break;
            
            case 3: carrito.agregarProducto(producto3);
                
                break;
    
            case 4: carrito.agregarProducto(producto4);
                
                break;
    
            case 5: carrito.agregarProducto(producto5);
                
                break;
    
            case 6: carrito.agregarProducto(producto6);
                
                break;
    
            case 7: carrito.agregarProducto(producto7);
                
                break;
    
            case 8: carrito.agregarProducto(producto8);
                
                break;
    
            case 9: carrito.agregarProducto(producto9);
                
                break;
    
            case 10: carrito.agregarProducto(producto10);
                
                break;
                
            case 11: carrito.agregarProducto(producto11);
                
                break;
    
            case 12: carrito.agregarProducto(producto12);
                
                break;
    
            case 13: carrito.agregarProducto(producto12);
                
                break;
    
            case 14: carrito.agregarProducto(producto14);
                
                break;
    
            case 15: carrito.agregarProducto(producto15);
                
                break;
        
            default: alert("El producto ingresado no esta disponible");
                break;
        };
        
    };
    
}while (nuevoProducto > 0 || nuevoProducto < 16 );

carrito.mostrarCarrito();
carrito.calcularTotal();

alert("Gracias por comprar en TecnoPlay")





