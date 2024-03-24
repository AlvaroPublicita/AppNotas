import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Importar variables de entorno
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET } = process.env;

// Crear un pool de conexiones a la base de datos
const createPool = async () => {
    try {
        const pool = await mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            timezone: 'Z',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log('Conexión a la base de datos establecida');
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        throw error;
    }
};

export { express, jwt, bcrypt, createPool, JWT_SECRET };
