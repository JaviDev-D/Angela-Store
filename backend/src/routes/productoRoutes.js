/**
 * Capa: Rutas
 * -------------------------------------------------------
 * Define los endpoints REST del módulo "producto" y los conecta
 * con el controlador correspondiente.
 */
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/productos", productoController.obtenerProductos);
router.get("/productos/:id", productoController.obtenerProductoPorId);
router.post("/productos", productoController.crearProducto);
router.put("/productos/:id", productoController.actualizarProducto);
router.delete("/productos/:id", productoController.eliminarProducto);

module.exports = router;
