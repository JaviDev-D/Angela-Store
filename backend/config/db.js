const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "angela_store"
});

conexion.connect((error) => {
    if (error) {
        console.log("Error de conexión:", error);
    } else { 
        console.log("Conectado a MySQL");
    }
});

module.exports = conexion;