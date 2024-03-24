import db from './db/db.js';

// Función para crear una nueva categoría
export const crearCategoria = async (nombre) => {
    try {
        const [result] = await db.query(
            'INSERT INTO Categorias (nombre) VALUES (?)',
            [nombre],
        );
        return result.insertId;
    } catch (error) {
        throw new Error('Error al crear la categoría en la base de datos');
    }
};

// Función para obtener todas las categorías
export const obtenerCategorias = async () => {
    try {
        const [categorias] = await db.query('SELECT * FROM Categorias');
        return categorias;
    } catch (error) {
        throw new Error('Error al obtener las categorías de la base de datos');
    }
};

// Función para obtener una categoría por su ID
export const obtenerCategoriaPorId = async (id) => {
    try {
        const [categoria] = await db.query(
            'SELECT * FROM Categorias WHERE id = ?',
            [id],
        );
        if (categoria.length > 0) {
            return categoria[0];
        } else {
            throw new Error('Categoría no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener la categoría de la base de datos');
    }
};

// Función para actualizar una categoría por su ID
export const actualizarCategoria = async (id, nombre) => {
    try {
        const [result] = await db.query(
            'UPDATE Categorias SET nombre = ? WHERE id = ?',
            [nombre, id],
        );
        if (result.affectedRows > 0) {
            return true; // Actualización exitosa
        } else {
            throw new Error('Categoría no encontrada');
        }
    } catch (error) {
        throw new Error('Error al actualizar la categoría en la base de datos');
    }
};

// Función para eliminar una categoría por su ID
export const eliminarCategoria = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM Categorias WHERE id = ?', [
            id,
        ]);
        if (result.affectedRows > 0) {
            return true; // Eliminación exitosa
        } else {
            throw new Error('Categoría no encontrada');
        }
    } catch (error) {
        throw new Error('Error al eliminar la categoría de la base de datos');
    }
};
