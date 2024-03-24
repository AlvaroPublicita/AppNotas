// db.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Función para crear un pool de conexiones a la base de datos
const createPool = async () => {
    try {
        // Crear un pool de conexiones a la base de datos
        const pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            timezone: 'Z',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // Crear la base de datos si no existe
        await pool.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
        );

        console.log('Conexión a la base de datos establecida');

        // Retornar el pool de conexiones
        return pool;
    } catch (error) {
        // Si hay un error, imprimirlo en consola
        console.error('Error al conectar a la base de datos', error);
        throw error; // Relanzar el error para que el llamador pueda manejarlo
    }
};

// Exportar la función createPool
export { createPool };
