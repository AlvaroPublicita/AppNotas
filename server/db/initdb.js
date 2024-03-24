import { createPool } from './db.js';

// Función para crear las tablas de la base de datos
const initDB = async () => {
    try {
        const pool = await createPool(); // Obtener el pool de conexiones

        const connection = await pool.getConnection();

        // Crear tabla de usuarios
        await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL
      )
    `);

        // Crear tabla de notas
        await connection.query(`
      CREATE TABLE IF NOT EXISTS notas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        texto TEXT NOT NULL,
        categoria_id INT,
        usuario_id INT,
        publica BOOLEAN DEFAULT 0,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);

        // Crear tabla de categorías
        await connection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL
      )
    `);

        // Crear tabla de tokens
        await connection.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        usuario_id INT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);

        console.log('Tablas creadas con éxito');

        connection.release(); // Liberar la conexión

        pool.end(); // Cerrar el pool de conexiones
    } catch (error) {
        console.error('Error al crear las tablas', error);
    }
};

// Inicializar la base de datos
initDB()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Error en la inicialización de la base de datos:', error);
        process.exit(1);
    });
