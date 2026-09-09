/**
 * Capa: Configuración / Acceso a datos (infraestructura)
 * -------------------------------------------------------
 * Crea un pool de conexiones a MySQL usando variables de entorno.
 * Se usa un pool (en vez de una única conexión) porque soporta
 * múltiples peticiones concurrentes sin bloquear el servidor.
 */
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "angela_store",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Algunos proveedores de MySQL en la nube (ej. Clever Cloud, Aiven) exigen SSL.
    // Actívalo agregando DB_SSL=true en las variables de entorno de producción.
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

// Prueba la conexión al iniciar la aplicación
async function verificarConexion() {
    try {
        const conexion = await pool.getConnection();
        console.log("✅ Conectado a MySQL correctamente");
        conexion.release();
    } catch (error) {
        console.error("❌ Error de conexión a MySQL:", error.message);
    }
}

verificarConexion();

module.exports = pool;
