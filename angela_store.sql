-- ============================================================
-- Angela Store - Script de creación de base de datos
-- ============================================================

CREATE DATABASE IF NOT EXISTS angela_store
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE angela_store;

-- Tabla principal de productos (nombre en plural, consistente
-- con las consultas del backend)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    talla VARCHAR(10) NOT NULL,
    color VARCHAR(30) NOT NULL,
    precio DOUBLE NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255) DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO productos (nombre, talla, color, precio, stock, imagen_url) VALUES
('Camiseta Basica', 'M', 'Blanco', 50000, 20, 'https://png.pngtree.com/png-vector/20240815/ourmid/pngtree-classic-white-t-shirt-perfect-for-custom-printing-with-a-blank-png-image_13485404.png'),
('Pantalon', 'L', 'Azul', 80000, 15, 'https://freestorecol.com/cdn/shop/files/pantalon-basico-granada-bolsillos-azul.png?v=1729968193&width=1080');
