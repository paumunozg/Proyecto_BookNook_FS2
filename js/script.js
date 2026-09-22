// 1. PRODUCTOS

const productos = [
    {
        id: 1,
        nombre: "El nombre del viento",
        categoria: "Fantástica & Sci-Fi",
        precio: 18990,
        imagen: "../img/libro1.jpg",
        descripcion: "Una novela de fantasía que narra la historia de Kvothe y su camino por un mundo lleno de magia, música y misterios."
    },

    {
        id: 2,
        nombre: "Death Note",
        categoria: "Mangas & Cómics",
        precio: 12990,
        imagen: "../img/libro2.jpg",
        descripcion: "Manga que cuenta la historia de un estudiante que encuentra un misterioso cuaderno capaz de acabar con la vida de cualquier persona."
    },

    {
        id: 3,
        nombre: "Coraline",
        categoria: "Novelas",
        precio: 10990,
        imagen: "../img/libro3.jpg",
        descripcion: "Una historia de fantasía y misterio sobre una niña que descubre una puerta hacia un mundo aparentemente perfecto."
    },

    {
        id: 4,
        nombre: "Jujutsu Kaisen",
        categoria: "Mangas & Cómics",
        precio: 9990,
        imagen: "../img/libro4.jpg",
        descripcion: "Manga de acción y fantasía protagonizado por Yuji Itadori y su enfrentamiento contra las maldiciones."
    },

    {
        id: 5,
        nombre: "El Hobbit",
        categoria: "Fantástica & Sci-Fi",
        precio: 15990,
        imagen: "../img/libro5.jpg",
        descripcion: "La aventura de Bilbo Bolsón, quien abandona la tranquilidad de su hogar para embarcarse en una gran aventura."
    },

    {
        id: 6,
        nombre: "La biblioteca de medianoche",
        categoria: "Novelas",
        precio: 16990,
        imagen: "../img/libro6.jpg",
        descripcion: "Una novela sobre las posibilidades de la vida y las decisiones que pueden cambiar nuestro camino."
    }
];

// 2. FUNCIONES GENERALES
// Formatear precios en pesos chilenos
function formatoPrecio(precio) {
    return "$" + precio.toLocaleString("es-CL");
}

// Buscar un producto por su ID
function buscarProducto(id) {
    return productos.find(function(producto) {
        return producto.id === id;
    });
}

// 3. CARRITO

let carrito = JSON.parse(localStorage.getItem("booknookCarrito")) || [];

function guardarCarrito() {
    localStorage.setItem(
        "booknookCarrito",
        JSON.stringify(carrito)
    );
}

function actualizarContadorCarrito() {

    const contadores = document.querySelectorAll("#cantidadCarrito");

    let cantidadTotal = 0;

    carrito.forEach(function(item) {
        cantidadTotal += item.cantidad;
    });

    contadores.forEach(function(contador) {
        contador.textContent = cantidadTotal;
    });
}

function agregarAlCarrito(id, cantidad = 1) {

    const producto = buscarProducto(id);

    if (!producto) {
        return;
    }

    const productoExistente = carrito.find(function(item) {
        return item.id === id;
    });


    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });

    }


    guardarCarrito();

    actualizarContadorCarrito();

    alert("¡" + producto.nombre + " fue agregado al carrito!");
}

// 4. BOTONES "AÑADIR AL CARRITO"
function configurarBotonesCarrito() {

    const botones = document.querySelectorAll(".btn-carrito");

    botones.forEach(function(boton, indice) {

        boton.addEventListener("click", function() {

            /*
             * Buscamos la tarjeta donde está el botón.
             */
            const tarjeta = boton.closest(".producto-card");


            if (tarjeta) {

                const nombreProducto =
                    tarjeta.querySelector("h2, h3")?.textContent.trim();

                const producto =
                    productos.find(function(item) {
                        return item.nombre === nombreProducto;
                    });


                if (producto) {

                    agregarAlCarrito(producto.id);

                }

            }

        });

    });
}

// 5. REGLA DEL MARCADOR GRATIS

const MONTO_MARCADOR_GRATIS = 30000;

function calcularTotalCarrito() {

    let total = 0;

    carrito.forEach(function(item) {

        total += item.precio * item.cantidad;

    });

    return total;
}

function verificarMarcadorGratis() {

    const total = calcularTotalCarrito();

    return total > MONTO_MARCADOR_GRATIS;
}

// 6. FILTRO DE PRODUCTOS
function configurarFiltros() {

    const botonesCategorias =
        document.querySelectorAll(".categorias button");

    const tarjetas =
        document.querySelectorAll(".producto-card");


    botonesCategorias.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const categoriaSeleccionada =
                boton.textContent.trim();


            tarjetas.forEach(function(tarjeta) {

                const categoria =
                    tarjeta.querySelector(".categoria")?.textContent.trim();


                if (
                    categoriaSeleccionada === "Todos" ||
                    categoria === categoriaSeleccionada
                ) {

                    tarjeta.style.display = "block";

                } else {

                    tarjeta.style.display = "none";

                }

            });

        });

    });
}

// 7. REGISTRO
const formularioRegistro =
    document.getElementById("formRegistro");


if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(event) {

        event.preventDefault();


        // Obtenemos los valores
        const nombre =
            document.getElementById("nombre").value.trim();

        const apellido =
            document.getElementById("apellido").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const telefono =
            document.getElementById("telefono").value.trim();

        const direccion =
            document.getElementById("direccion").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Limpiamos mensajes anteriores
        document.getElementById("errorNombre").textContent = "";
        document.getElementById("errorApellido").textContent = "";
        document.getElementById("errorCorreo").textContent = "";
        document.getElementById("errorTelefono").textContent = "";
        document.getElementById("errorDireccion").textContent = "";
        document.getElementById("errorPassword").textContent = "";
        document.getElementById("errorConfirmPassword").textContent = "";


        let formularioValido = true;


        // Nombre
        if (nombre === "") {

            document.getElementById("errorNombre").textContent =
                "El nombre es obligatorio.";

            formularioValido = false;

        }


        // Apellido
        if (apellido === "") {

            document.getElementById("errorApellido").textContent =
                "El apellido es obligatorio.";

            formularioValido = false;

        }


        // Correo
        if (correo === "") {

            document.getElementById("errorCorreo").textContent =
                "El correo es obligatorio.";

            formularioValido = false;

        } else if (!correoValido(correo)) {

            document.getElementById("errorCorreo").textContent =
                "El correo no tiene un formato válido.";

            formularioValido = false;

        }


        // Teléfono
        if (telefono === "") {

            document.getElementById("errorTelefono").textContent =
                "El teléfono es obligatorio.";

            formularioValido = false;

        }


        // Dirección
        if (direccion === "") {

            document.getElementById("errorDireccion").textContent =
                "La dirección es obligatoria.";

            formularioValido = false;

        }


        // Contraseña
        if (password === "") {

            document.getElementById("errorPassword").textContent =
                "La contraseña es obligatoria.";

            formularioValido = false;

        } else if (password.length < 4 || password.length > 10) {

            document.getElementById("errorPassword").textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";

            formularioValido = false;

        }


        // Confirmar contraseña
        if (confirmPassword !== password) {

            document.getElementById("errorConfirmPassword").textContent =
                "Las contraseñas no coinciden.";

            formularioValido = false;

        }


        if (!formularioValido) {
            return;
        }


        // Recuperamos usuarios existentes
        let usuarios =
            JSON.parse(localStorage.getItem("booknookUsuarios")) || [];


        // Comprobamos si ya existe el correo
        const usuarioExistente =
            usuarios.find(function(usuario) {
                return usuario.correo === correo;
            });


        if (usuarioExistente) {

            document.getElementById("errorCorreo").textContent =
                "Este correo ya está registrado.";

            return;
        }


        // Creamos el usuario
        const nuevoUsuario = {

            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
            password: password

        };


        usuarios.push(nuevoUsuario);


        // Guardamos usuarios
        localStorage.setItem(
            "booknookUsuarios",
            JSON.stringify(usuarios)
        );


        alert("¡Cuenta creada correctamente!");


        formularioRegistro.reset();


        // Vamos al login
        window.location.href = "login.html";

    });

}

// 8. VALIDACIÓN DE CORREO
function correoValido(correo) {

    const expresion =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    return expresion.test(correo);
}

// 9. LOGIN
const formularioLogin =
    document.getElementById("formLogin");


if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {

        event.preventDefault();


        const correo =
            document.getElementById("loginCorreo").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        document.getElementById("errorLoginCorreo").textContent = "";
        document.getElementById("errorLoginPassword").textContent = "";


        let formularioValido = true;


        if (correo === "") {

            document.getElementById("errorLoginCorreo").textContent =
                "El correo es obligatorio.";

            formularioValido = false;

        } else if (!correoValido(correo)) {

            document.getElementById("errorLoginCorreo").textContent =
                "Ingresa un correo válido.";

            formularioValido = false;

        }


        if (password === "") {

            document.getElementById("errorLoginPassword").textContent =
                "La contraseña es obligatoria.";

            formularioValido = false;

        }


        if (!formularioValido) {
            return;
        }


        const usuarios =
            JSON.parse(localStorage.getItem("booknookUsuarios")) || [];


        const usuarioEncontrado =
            usuarios.find(function(usuario) {

                return (
                    usuario.correo === correo &&
                    usuario.password === password
                );

            });


        if (!usuarioEncontrado) {

            document.getElementById("errorLoginPassword").textContent =
                "Correo o contraseña incorrectos.";

            return;
        }


        // Guardamos la sesión
        localStorage.setItem(
            "booknookUsuarioActual",
            JSON.stringify(usuarioEncontrado)
        );


        alert(
            "¡Bienvenida/o a BookNook, " +
            usuarioEncontrado.nombre +
            "! 📚"
        );


        window.location.href = "../index.html";

    });

}

// 10. FORMULARIO DE CONTACTO
const formularioContacto =
    document.getElementById("formContacto");


if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(event) {

        event.preventDefault();


        const nombre =
            document.getElementById("contactoNombre").value.trim();

        const correo =
            document.getElementById("contactoCorreo").value.trim();

        const asunto =
            document.getElementById("asunto").value;

        const comentario =
            document.getElementById("comentario").value.trim();


        document.getElementById("errorContactoNombre").textContent = "";
        document.getElementById("errorContactoCorreo").textContent = "";
        document.getElementById("errorAsunto").textContent = "";
        document.getElementById("errorComentario").textContent = "";
        document.getElementById("mensajeContacto").textContent = "";


        let formularioValido = true;


        if (nombre === "") {

            document.getElementById("errorContactoNombre").textContent =
                "El nombre es obligatorio.";

            formularioValido = false;

        } else if (nombre.length > 100) {

            document.getElementById("errorContactoNombre").textContent =
                "El nombre no puede superar los 100 caracteres.";

            formularioValido = false;

        }


        if (correo === "") {

            document.getElementById("errorContactoCorreo").textContent =
                "El correo es obligatorio.";

            formularioValido = false;

        } else if (correo.length > 100) {

            document.getElementById("errorContactoCorreo").textContent =
                "El correo no puede superar los 100 caracteres.";

            formularioValido = false;

        } else if (!correoValido(correo)) {

            document.getElementById("errorContactoCorreo").textContent =
                "Ingresa un correo válido.";

            formularioValido = false;

        }


        if (asunto === "") {

            document.getElementById("errorAsunto").textContent =
                "Debes seleccionar un asunto.";

            formularioValido = false;

        }


        if (comentario === "") {

            document.getElementById("errorComentario").textContent =
                "El comentario es obligatorio.";

            formularioValido = false;

        } else if (comentario.length > 500) {

            document.getElementById("errorComentario").textContent =
                "El comentario no puede superar los 500 caracteres.";

            formularioValido = false;

        }


        if (!formularioValido) {
            return;
        }


        document.getElementById("mensajeContacto").textContent =
            "¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.";


        formularioContacto.reset();

    });

}

// 11. BOTÓN DEL CARRITO
const botonCarrito =
    document.getElementById("btnCarrito");


if (botonCarrito) {

    botonCarrito.addEventListener("click", function() {

        if (carrito.length === 0) {

            alert("Tu carrito está vacío.");

            return;
        }


        let mensaje = "Productos en tu carrito:\n\n";


        carrito.forEach(function(item) {

            mensaje +=
                item.nombre +
                " x" +
                item.cantidad +
                " = " +
                formatoPrecio(item.precio * item.cantidad) +
                "\n";

        });


        mensaje +=
            "\nTotal: " +
            formatoPrecio(calcularTotalCarrito());


        if (verificarMarcadorGratis()) {

            mensaje +=
                "\n\n🎁 ¡Tu compra incluye un marcador gratis!";

        }


        alert(mensaje);

    });

}

// 12. INICIALIZACIÓN

actualizarContadorCarrito();

configurarBotonesCarrito();

configurarFiltros();

//FUNCIONES PANEL DE ADMIN

let productosAdmin =
    JSON.parse(localStorage.getItem("booknookProductos")) || [];

// Guardar productos
function guardarProductosAdmin() {
    localStorage.setItem(
        "booknookProductos",
        JSON.stringify(productosAdmin)
    );
}

// Buscar producto por código
function buscarProductoAdmin(codigo) {
    return productosAdmin.find(function(producto) {
        return producto.codigo === codigo;
    });
}

// Validar producto
function validarProductoAdmin(producto) {

    if (producto.codigo.trim() === "") {
        return "El código es obligatorio.";
    }

    if (producto.codigo.trim().length < 3) {
        return "El código debe tener al menos 3 caracteres.";
    }

    if (producto.nombre.trim() === "") {
        return "El nombre es obligatorio.";
    }

    if (producto.nombre.trim().length > 100) {
        return "El nombre no puede superar los 100 caracteres.";
    }

    if (producto.descripcion.trim().length > 500) {
        return "La descripción no puede superar los 500 caracteres.";
    }

    if (producto.precio === "" || Number(producto.precio) < 0) {
        return "El precio debe ser mayor o igual a 0.";
    }

    if (
        producto.stock === "" ||
        Number(producto.stock) < 0 ||
        !Number.isInteger(Number(producto.stock))
    ) {
        return "El stock debe ser un número entero mayor o igual a 0.";
    }

    if (
        producto.stockCritico !== "" &&
        (
            Number(producto.stockCritico) < 0 ||
            !Number.isInteger(Number(producto.stockCritico))
        )
    ) {
        return "El stock crítico debe ser un número entero mayor o igual a 0.";
    }

    if (producto.categoria === "") {
        return "Debe seleccionar una categoría.";
    }

    return null;
}

//crear producto
const formularioNuevoProducto =
    document.getElementById("formNuevoProducto");

if (formularioNuevoProducto) {

    formularioNuevoProducto.addEventListener("submit", function(event) {

        event.preventDefault();

        const producto = {

            codigo: document
                .getElementById("codigoProducto")
                .value.trim(),

            nombre: document
                .getElementById("nombreProducto")
                .value.trim(),

            precio: document
                .getElementById("precioProducto")
                .value,

            stock: document
                .getElementById("stockProducto")
                .value,

            stockCritico: document
                .getElementById("stockCritico")
                .value,

            categoria: document
                .getElementById("categoriaProducto")
                .value,

            descripcion: document
                .getElementById("descripcionProducto")
                .value.trim(),

            imagen: document
                .getElementById("imagenProducto")
                .value

        };


        const error = validarProductoAdmin(producto);

        if (error) {
            alert(error);
            return;
        }


        if (buscarProductoAdmin(producto.codigo)) {
            alert("Ya existe un producto con ese código.");
            return;
        }


        productosAdmin.push(producto);

        guardarProductosAdmin();

        alert("Producto agregado correctamente.");

        window.location.href = "productos.html";

    });
}

//listar producto
const tablaProductos =
    document.querySelector(".admin-tabla tbody");

if (tablaProductos) {

    // Si todavía no existen productos,
    // dejamos los productos de ejemplo que ya tiene el HTML.
    if (productosAdmin.length === 0) {

        productosAdmin = [
            {
                codigo: "BK001",
                nombre: "El Hobbit",
                categoria: "fantasia",
                precio: 12990,
                stock: 15,
                stockCritico: 5,
                descripcion:
                    "Una aventura clásica de fantasía para los amantes de la literatura fantástica.",
                imagen: ""
            },
            {
                codigo: "BK002",
                nombre: "Coraline",
                categoria: "fantasia",
                precio: 10990,
                stock: 8,
                stockCritico: 3,
                descripcion: "",
                imagen: ""
            },
            {
                codigo: "BK003",
                nombre: "Jujutsu Kaisen #1",
                categoria: "mangas",
                precio: 8990,
                stock: 4,
                stockCritico: 2,
                descripcion: "",
                imagen: ""
            }
        ];

        guardarProductosAdmin();
    }


    tablaProductos.innerHTML = "";


    productosAdmin.forEach(function(producto) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.codigo}</td>

            <td>
                <strong>${producto.nombre}</strong>
            </td>

            <td>${producto.categoria}</td>

            <td>$${Number(producto.precio).toLocaleString("es-CL")}</td>

            <td>${producto.stock}</td>

            <td class="acciones-tabla">

                <a
                    href="detalle-producto.html?codigo=${producto.codigo}"
                    class="btn-tabla btn-ver">
                    Ver
                </a>

                <a
                    href="editar-producto.html?codigo=${producto.codigo}"
                    class="btn-tabla btn-editar">
                    Editar
                </a>

                <button
                    type="button"
                    class="btn-tabla btn-eliminar"
                    onclick="eliminarProductoAdmin('${producto.codigo}')">
                    Eliminar
                </button>

            </td>
        `;

        tablaProductos.appendChild(fila);

    });

}

//eliminar producto
function eliminarProductoAdmin(codigo) {

    const confirmar = confirm(
        "¿Estás seguro de eliminar este producto?"
    );

    if (!confirmar) {
        return;
    }


    productosAdmin = productosAdmin.filter(function(producto) {
        return producto.codigo !== codigo;
    });


    guardarProductosAdmin();

    alert("Producto eliminado correctamente.");

    window.location.reload();

}

//editar producto
const formularioEditarProducto =
    document.getElementById("formEditarProducto");

if (formularioEditarProducto) {

    const parametros =
        new URLSearchParams(window.location.search);

    const codigoOriginal =
        parametros.get("codigo");


    let producto = buscarProductoAdmin(codigoOriginal);


    if (!producto) {
        producto = buscarProductoAdmin("BK001");
    }


    if (producto) {

        document.getElementById("editarCodigo").value =
            producto.codigo;

        document.getElementById("editarNombre").value =
            producto.nombre;

        document.getElementById("editarPrecio").value =
            producto.precio;

        document.getElementById("editarStock").value =
            producto.stock;

        document.getElementById("editarStockCritico").value =
            producto.stockCritico;

        document.getElementById("editarCategoria").value =
            producto.categoria;

        document.getElementById("editarDescripcion").value =
            producto.descripcion;
    }


    formularioEditarProducto.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const codigo =
                document.getElementById("editarCodigo").value.trim();


            const nuevosDatos = {

                codigo: codigo,

                nombre:
                    document.getElementById("editarNombre")
                    .value.trim(),

                precio:
                    document.getElementById("editarPrecio")
                    .value,

                stock:
                    document.getElementById("editarStock")
                    .value,

                stockCritico:
                    document.getElementById("editarStockCritico")
                    .value,

                categoria:
                    document.getElementById("editarCategoria")
                    .value,

                descripcion:
                    document.getElementById("editarDescripcion")
                    .value.trim(),

                imagen:
                    document.getElementById("editarImagen")
                    .value

            };


            const error =
                validarProductoAdmin(nuevosDatos);


            if (error) {
                alert(error);
                return;
            }


            const productoEditar =
                buscarProductoAdmin(codigoOriginal);


            if (!productoEditar) {
                alert("Producto no encontrado.");
                return;
            }


            productoEditar.codigo = codigo;
            productoEditar.nombre = nuevosDatos.nombre;
            productoEditar.precio = nuevosDatos.precio;
            productoEditar.stock = nuevosDatos.stock;
            productoEditar.stockCritico = nuevosDatos.stockCritico;
            productoEditar.categoria = nuevosDatos.categoria;
            productoEditar.descripcion = nuevosDatos.descripcion;


            guardarProductosAdmin();


            alert("Producto actualizado correctamente.");

            window.location.href = "productos.html";

        }
    );

}

//detalle producto
if (
    window.location.pathname.includes("detalle-producto.html")
) {

    const parametros =
        new URLSearchParams(window.location.search);

    const codigo =
        parametros.get("codigo");


    const producto =
        buscarProductoAdmin(codigo || "BK001");


    if (producto) {

        const detalle =
            document.querySelector(".admin-detalle-info");

        if (detalle) {

            const categoriaNombre = {

                mangas: "Mangas & Cómics",

                fantasia: "Fantástica & Sci-Fi",

                novelas: "Novelas",

                merch: "Marcadores & Merch"

            };


            detalle.querySelector(".categoria").textContent =
                categoriaNombre[producto.categoria] ||
                producto.categoria;


            detalle.querySelector("h2").textContent =
                producto.nombre;


            detalle.querySelector(".admin-codigo").textContent =
                "Código: " + producto.codigo;


            const parrafos =
                detalle.querySelectorAll("p");


            // Descripción
            if (parrafos.length > 1) {
                parrafos[1].textContent =
                    producto.descripcion;
            }


            detalle.querySelector(".precio").textContent =
                "$" +
                Number(producto.precio)
                .toLocaleString("es-CL");


            const datos =
                detalle.querySelectorAll(
                    ".admin-datos-producto span"
                );


            if (datos.length >= 3) {

                datos[0].textContent =
                    producto.stock + " unidades";

                datos[1].textContent =
                    producto.stockCritico === ""
                        ? "No definido"
                        : producto.stockCritico + " unidades";


                if (
                    producto.stockCritico !== "" &&
                    Number(producto.stock) <=
                    Number(producto.stockCritico)
                ) {

                    datos[2].textContent =
                        "Stock crítico";

                } else if (Number(producto.stock) === 0) {

                    datos[2].textContent =
                        "Sin stock";

                } else {

                    datos[2].textContent =
                        "Disponible";
                }
            }


            const botonEditar =
                detalle.querySelector(
                    'a[href="editar-producto.html"]'
                );


            if (botonEditar) {

                botonEditar.href =
                    "editar-producto.html?codigo=" +
                    producto.codigo;

            }

        }

    }

}
