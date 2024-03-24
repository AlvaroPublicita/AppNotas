import { createPool } from '../db/db.js';

// Crear el pool de conexiones
const pool = await createPool();

// Función para crear un nuevo usuario
export const crearUsuario = async (email, contraseña) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuarios (email, contraseña) VALUES (?, ?)',
            [email, contraseña],
        );
        return result.insertId;
    } catch (error) {
        throw new Error('Error al crear el usuario en la base de datos');
    }
};

// Función para obtener un usuario por su ID
export const obtenerUsuarioPorId = async (id) => {
    try {
        const [usuario] = await pool.query(
            'SELECT * FROM Usuarios WHERE id = ?',
            [id],
        );
        if (usuario.length > 0) {
            return usuario[0];
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        throw new Error('Error al obtener el usuario de la base de datos');
    }
};

// Función para obtener un usuario por su email
export const obtenerUsuarioPorEmail = async (email) => {
    try {
        const [usuario] = await pool.query(
            'SELECT * FROM Usuarios WHERE email = ?',
            [email],
        );
        if (usuario.length > 0) {
            return usuario[0];
        } else {
            return null; // Usuario no encontrado
        }
    } catch (error) {
        throw new Error('Error al obtener el usuario de la base de datos');
    }
};
