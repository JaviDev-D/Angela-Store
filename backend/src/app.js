/**
 * Punto de integración de la aplicación.
 * Aquí se ensamblan todos los módulos: seguridad, rutas y
 * manejo de errores. Es el único archivo que conoce la app
 * completa; el resto de capas son independientes entre sí.
 */
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const productoRoutes = require("./routes/productoRoutes");
const { errorHandler, rutaNoEncontrada } = require("./middlewares/errorHandler");

const app = express();

// --- Seguridad ---
app.use(helmet()); // cabeceras HTTP seguras (XSS, sniffing, etc.)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*", // restringe el origen en producción
    })
);
app.use(express.json({ limit: "100kb" })); // evita payloads gigantes

// --- Rutas ---
app.get("/", (req, res) => {
    res.send("Servidor de Angela Store funcionando ✅");
});

app.use("/api", productoRoutes);

// --- Manejo de errores (siempre al final) ---
app.use(rutaNoEncontrada);
app.use(errorHandler);

module.exports = app;
