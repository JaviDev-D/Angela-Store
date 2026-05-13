const conexion = require("../config/db");

exports.ObtenerProductos = (req, res) => {

    conexion.query(
        "SELECT * FROM productos",
        (error, resultados ) => {
            if (error) {
                res.send(error);
            } else {
                res.json(resultados);
            }
        }
    );
};

exports.CrearProducto = (req, res) => {
    const { nombre, talla, color, precio } = req.body;
    conexion.query(
        "INSERT INTO productos (nombre, talla, color, precio) VALUES (?, ?, ?, ?)",
        [nombre, talla, color, precio],

        (error) => {
            if (error) {
                res.send(error);
            } else {
                res.send("Producto Agregado");
            }
         }
    );
};