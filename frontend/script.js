/**
 * Módulo frontend de Angela Store.
 * Se conecta a la API REST del backend (capa de presentación),
 * renderiza los productos dinámicamente y gestiona el carrito
 * y el formulario de administración (CRUD).
 */

// Cambia esta URL si el backend corre en otra dirección/puerto.
const API_URL = "http://localhost:3000/api/productos";

let contador = 0;

const listaProductos = document.getElementById("listaProductos");
const contadorHTML = document.getElementById("contador");
const mensajeEstado = document.getElementById("mensajeEstado");

const panelAdmin = document.getElementById("panelAdmin");
const linkAdmin = document.getElementById("linkAdmin");
const formProducto = document.getElementById("formProducto");
const btnCancelar = document.getElementById("btnCancelar");

// ---------- Utilidades ----------

function mostrarMensaje(texto, tipo = "info") {
    mensajeEstado.textContent = texto;
    mensajeEstado.className = `mensaje-estado ${tipo}`;
    mensajeEstado.hidden = false;
    setTimeout(() => (mensajeEstado.hidden = true), 3500);
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(precio);
}

// ---------- Renderizado de productos (READ) ----------

async function cargarProductos() {
    listaProductos.innerHTML = '<p class="cargando">Cargando productos...</p>';
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo.");
        const productos = await respuesta.json();
        renderizarProductos(productos);
    } catch (error) {
        listaProductos.innerHTML = `<p class="error">⚠️ ${error.message} Verifica que el backend esté corriendo.</p>`;
    }
}

function renderizarProductos(productos) {
    if (!productos.length) {
        listaProductos.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    listaProductos.innerHTML = "";
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${producto.imagen_url || 'img/placeholder.png'}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="detalle">Talla: ${producto.talla} · Color: ${producto.color}</p>
            <p class="precio">${formatearPrecio(producto.precio)}</p>
            <div class="card-botones">
                <button class="btn-agregar" data-id="${producto.id}">+ Carrito</button>
                <button class="btn-editar" data-id="${producto.id}">Editar</button>
                <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
        listaProductos.appendChild(card);
    });

    document.querySelectorAll(".btn-agregar").forEach((boton) => {
        boton.addEventListener("click", () => {
            contador++;
            contadorHTML.textContent = contador;
        });
    });

    document.querySelectorAll(".btn-editar").forEach((boton) => {
        boton.addEventListener("click", () => editarProducto(boton.dataset.id, productos));
    });

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
        boton.addEventListener("click", () => eliminarProducto(boton.dataset.id));
    });
}

// ---------- Panel de administración (CREATE / UPDATE / DELETE) ----------

linkAdmin.addEventListener("click", (evento) => {
    evento.preventDefault();
    panelAdmin.hidden = !panelAdmin.hidden;
});

formProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const id = document.getElementById("productoId").value;
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        talla: document.getElementById("talla").value.trim(),
        color: document.getElementById("color").value.trim(),
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value || 0),
        imagen_url: document.getElementById("imagen_url").value.trim() || null,
    };

    try {
        const opciones = {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
        };
        const respuesta = await fetch(id ? `${API_URL}/${id}` : API_URL, opciones);
        const cuerpo = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok) {
            throw new Error(cuerpo.error || "No se pudo guardar el producto.");
        }

        mostrarMensaje(id ? "Producto actualizado ✅" : "Producto creado ✅", "exito");
        limpiarFormulario();
        cargarProductos();
    } catch (error) {
        mostrarMensaje(`⚠️ ${error.message}`, "error");
    }
});

function editarProducto(id, productos) {
    const producto = productos.find((p) => String(p.id) === String(id));
    if (!producto) return;

    document.getElementById("productoId").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("talla").value = producto.talla;
    document.getElementById("color").value = producto.color;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock ?? 0;
    document.getElementById("imagen_url").value = producto.imagen_url || "";

    panelAdmin.hidden = false;
    btnCancelar.hidden = false;
    document.getElementById("btnGuardar").textContent = "Actualizar producto";
    window.scrollTo({ top: panelAdmin.offsetTop, behavior: "smooth" });
}

btnCancelar.addEventListener("click", limpiarFormulario);

function limpiarFormulario() {
    formProducto.reset();
    document.getElementById("productoId").value = "";
    btnCancelar.hidden = true;
    document.getElementById("btnGuardar").textContent = "Guardar producto";
}

async function eliminarProducto(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!respuesta.ok && respuesta.status !== 204) {
            const cuerpo = await respuesta.json().catch(() => ({}));
            throw new Error(cuerpo.error || "No se pudo eliminar el producto.");
        }
        mostrarMensaje("Producto eliminado 🗑️", "exito");
        cargarProductos();
    } catch (error) {
        mostrarMensaje(`⚠️ ${error.message}`, "error");
    }
}

// ---------- Inicialización ----------
document.addEventListener("DOMContentLoaded", cargarProductos);
