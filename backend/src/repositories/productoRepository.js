/**
 * Capa: Repositorio (acceso a datos)
 * -------------------------------------------------------
 * Patrón de diseño: Repository.
 * Aísla las sentencias SQL del resto de la aplicación. Si mañana
 * cambia el motor de base de datos, solo se modifica este archivo.
 * Todas las consultas usan parámetros (?) para prevenir inyección SQL.
 */
const pool = require("../config/db");

async function obtenerTodos() {
    const [filas] = await pool.query("SELECT * FROM productos ORDER BY id DESC");
    return filas;
}

async function obtenerPorId(id) {
    const [filas] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
    return filas[0] || null;
}

async function crear({ nombre, talla, color, precio, stock, imagen_url }) {
    const [resultado] = await pool.query(
        `INSERT INTO productos (nombre, talla, color, precio, stock, imagen_url)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, talla, color, precio, stock ?? 0, imagen_url ?? null]
    );
    return obtenerPorId(resultado.insertId);
}

async function actualizar(id, { nombre, talla, color, precio, stock, imagen_url }) {
    await pool.query(
        `UPDATE productos
         SET nombre = ?, talla = ?, color = ?, precio = ?, stock = ?, imagen_url = ?
         WHERE id = ?`,
        [nombre, talla, color, precio, stock ?? 0, imagen_url ?? null, id]
    );
    return obtenerPorId(id);
}

async function eliminar(id) {
    const [resultado] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    return resultado.affectedRows > 0;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
};
