/**
 * Middleware central de manejo de errores.
 * Evita duplicar try/catch de formato de respuesta en cada
 * controlador y evita filtrar detalles internos (stack traces,
 * mensajes de MySQL) al cliente.
 */
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} ->`, err.message);

    const status = err.status || 500;
    const mensaje =
        status === 500 ? "Error interno del servidor." : err.message;

    res.status(status).json({ error: mensaje });
}

function rutaNoEncontrada(req, res) {
    res.status(404).json({ error: `Ruta no encontrada: ${req.originalUrl}` });
}

module.exports = { errorHandler, rutaNoEncontrada };
