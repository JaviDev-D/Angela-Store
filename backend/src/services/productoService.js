/**
 * Capa: Servicio (lógica de negocio)
 * -------------------------------------------------------
 * Aquí viven las reglas de negocio y validaciones. El controlador
 * no debe conocer detalles de SQL, y el repositorio no debe conocer
 * reglas de negocio: esa separación es lo que permite reutilizar
 * y probar cada módulo de forma independiente (pruebas unitarias).
 */
const productoRepository = require("../repositories/productoRepository");

class ErrorDeValidacion extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorDeValidacion";
        this.status = 400;
    }
}

class ErrorNoEncontrado extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNoEncontrado";
        this.status = 404;
    }
}

function validarDatosProducto(datos, { parcial = false } = {}) {
    const { nombre, talla, color, precio, stock } = datos;

    if (!parcial || nombre !== undefined) {
        if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
            throw new ErrorDeValidacion("El nombre del producto es obligatorio (mínimo 2 caracteres).");
        }
    }
    if (!parcial || talla !== undefined) {
        if (!talla || typeof talla !== "string") {
            throw new ErrorDeValidacion("La talla es obligatoria.");
        }
    }
    if (!parcial || color !== undefined) {
        if (!color || typeof color !== "string") {
            throw new ErrorDeValidacion("El color es obligatorio.");
        }
    }
    if (!parcial || precio !== undefined) {
        if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
            throw new ErrorDeValidacion("El precio debe ser un número mayor que 0.");
        }
    }
    if (stock !== undefined) {
        if (isNaN(stock) || Number(stock) < 0) {
            throw new ErrorDeValidacion("El stock debe ser un número igual o mayor que 0.");
        }
    }
}

async function listarProductos() {
    return productoRepository.obtenerTodos();
}

async function obtenerProducto(id) {
    const producto = await productoRepository.obtenerPorId(id);
    if (!producto) {
        throw new ErrorNoEncontrado(`No existe un producto con id ${id}.`);
    }
    return producto;
}

async function crearProducto(datos) {
    validarDatosProducto(datos);
    return productoRepository.crear(datos);
}

async function actualizarProducto(id, datos) {
    await obtenerProducto(id); // lanza ErrorNoEncontrado si no existe
    validarDatosProducto(datos, { parcial: true });
    return productoRepository.actualizar(id, datos);
}

async function eliminarProducto(id) {
    await obtenerProducto(id);
    return productoRepository.eliminar(id);
}

module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    validarDatosProducto,
    ErrorDeValidacion,
    ErrorNoEncontrado,
};
