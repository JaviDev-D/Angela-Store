/**
 * Punto de entrada del servidor.
 * Se separa de app.js para poder importar "app" en las pruebas
 * unitarias sin necesidad de levantar un puerto real.
 */
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});
