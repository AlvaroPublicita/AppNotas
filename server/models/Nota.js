import db from '../db/db.js';

// Función para crear una nueva nota
export const crearNota = async (
    titulo,
    texto,
    categoria_id,
    usuario_id,
    publica,
) => {
    try {
        const [result] = await db.query(
            'INSERT INTO Notas (titulo, texto, categoria_id, usuario_id, publica) VALUES (?, ?, ?, ?, ?)',
            [titulo, texto, categoria_id, usuario_id, publica],
        );
        return result.insertId;
    } catch (error) {
        throw new Error('Error al crear la nota en la base de datos');
    }
};

// Función para obtener todas las notas de un usuario
export const obtenerNotasPorUsuario = async (usuario_id) => {
    try {
        const [notas] = await db.query(
            'SELECT id, titulo FROM Notas WHERE usuario_id = ?',
            [usuario_id],
        );
        return notas;
    } catch (error) {
        throw new Error('Error al obtener las notas de la base de datos');
    }
};

// Función para obtener una nota por su ID
export const obtenerNotaPorId = async (id) => {
    try {
        const [nota] = await db.query('SELECT * FROM Notas WHERE id = ?', [id]);
        if (nota.length > 0) {
            return nota[0];
        } else {
            throw new Error('Nota no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener la nota de la base de datos');
    }
};

// Función para actualizar una nota por su ID
export const actualizarNota = async (
    id,
    titulo,
    texto,
    categoria_id,
    publica,
) => {
    try {
        const [result] = await db.query(
            'UPDATE Notas SET titulo = ?, texto = ?, categoria_id = ?, publica = ? WHERE id = ?',
            [titulo, texto, categoria_id, publica, id],
        );
        if (result.affectedRows > 0) {
            return true; // Actualización exitosa
        } else {
            throw new Error('Nota no encontrada');
        }
    } catch (error) {
        throw new Error('Error al actualizar la nota en la base de datos');
    }
};

// Función para eliminar una nota por su ID
export const eliminarNota = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM Notas WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            return true; // Eliminación exitosa
        } else {
            throw new Error('Nota no encontrada');
        }
    } catch (error) {
        throw new Error('Error al eliminar la nota de la base de datos');
    }
};
