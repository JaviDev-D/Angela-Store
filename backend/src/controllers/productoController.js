/**
 * Capa: Controlador (interfaz HTTP)
 * -------------------------------------------------------
 * Traduce peticiones/respuestas HTTP hacia la capa de servicio.
 * No contiene SQL ni reglas de negocio: solo delega y da formato
 * a la respuesta. Los errores se pasan a next(error) para que los
 * maneje el middleware central de errores.
 */
const productoService = require("../services/productoService");

async function obtenerProductos(req, res, next) {
    try {
        const productos = await productoService.listarProductos();
        res.json(productos);
    } catch (error) {
        next(error);
    }
}

async function obtenerProductoPorId(req, res, next) {
    try {
        const producto = await productoService.obtenerProducto(req.params.id);
        res.json(producto);
    } catch (error) {
        next(error);
    }
}

async function crearProducto(req, res, next) {
    try {
        const nuevoProducto = await productoService.crearProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
}

async function actualizarProducto(req, res, next) {
    try {
        const productoActualizado = await productoService.actualizarProducto(req.params.id, req.body);
        res.json(productoActualizado);
    } catch (error) {
        next(error);
    }
}

async function eliminarProducto(req, res, next) {
    try {
        await productoService.eliminarProducto(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
};
