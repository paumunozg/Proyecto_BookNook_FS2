//Carrito
let carrito=[];

const botonesCarrito = 
    document.querySelectorAll(".btn-carrito");

const contador = 
    document.getElementById("cantidadCarrito");

botonesCarrito.forEach(function(boton){
    boton.addEventListener("click", function(){
        carrito.push({
            producto: "Producto BookNook"
        });
        contador.textContent = carrito.length;

        alert("¡Producto agregado al carrito!");
    });
});


