const express = require("express");
const cors = require("cors");
const conexion = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando ");
});

app.listen(3000, () => {
    console.log("Servidor funcionando en puerto 3000 :) ");
});