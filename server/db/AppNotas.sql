CREATE DATABASE IF NOT EXISTS AppNotas;
USE AppNotas;

-- Creación de la tabla Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Creación de la tabla Categorías
CREATE TABLE IF NOT EXISTS Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL
);

-- Creación de la tabla notas
CREATE TABLE IF NOT EXISTS Notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    texto TEXT,
    publica BOOLEAN DEFAULT FALSE,
    imagen VARCHAR(255),
    categoria_id INT,
    usuario_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Algunas categorías de ejemplo
INSERT INTO Categorias (nombre) VALUES ('Personal'), ('Trabajo'), ('Familia'), ('Por hacer');