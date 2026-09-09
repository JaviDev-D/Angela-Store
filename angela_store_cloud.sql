-- ============================================================
-- Angela Store - Script para bases de datos en la nube
-- (Clever Cloud, Railway, Aiven, etc.)
-- ------------------------------------------------------------
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

INSERT INTO productos (nombre, talla, color, precio, stock, imagen_url) VALUES
('Camiseta Basica', 'M', 'Blanco', 50000, 20, 'https://png.pngtree.com/png-vector/20240815/ourmid/pngtree-classic-white-t-shirt-perfect-for-custom-printing-with-a-blank-png-image_13485404.png'),
('Pantalon', 'L', 'Azul', 80000, 15, 'https://freestorecol.com/cdn/shop/files/pantalon-basico-granada-bolsillos-azul.png?v=1729968193&width=1080');
