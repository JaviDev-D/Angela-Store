CREATE DATABASE angela_store;

USE angela_store;

CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    talla VARCHAR(10),
    color VARCHAR(30),
    precio DOUBLE
);

