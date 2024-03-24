import { createPool } from '../db/db.js';

// Función para crear una nueva categoría
export const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const pool = await createPool(); // Obtener el pool de conexiones
        const db = await pool.getConnection(); // Obtener una conexión de la pool
        await db.query(`INSERT INTO categorias (nombre) VALUES (?)`, [nombre]);
        db.release(); // Liberar la conexión después de usarla
        res.status(201).send({ message: 'Categoría creada con éxito!' });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).send({ message: 'Error al crear la categoría' });
    }
};

// Función para obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        const pool = await createPool(); // Obtener el pool de conexiones
        const db = await pool.getConnection(); // Obtener una conexión de la pool
        const [categorias] = await db.query(`SELECT * FROM categorias`);
        db.release(); // Liberar la conexión después de usarla
        res.status(200).send(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).send({ message: 'Error al obtener las categorías' });
    }
};

// Función para obtener una categoría específica por su ID
export const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await createPool(); // Obtener el pool de conexiones
        const db = await pool.getConnection(); // Obtener una conexión de la pool
        const [categoria] = await db.query(
            `SELECT * FROM categorias WHERE id = ?`,
            [id],
        );
        db.release(); // Liberar la conexión después de usarla
        if (categoria.length > 0) {
            res.status(200).send(categoria[0]);
        } else {
            res.status(404).send({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).send({ message: 'Error al obtener la categoría' });
    }
};

// Función para actualizar una categoría por su ID
export const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await createPool(); // Obtener el pool de conexiones
        const db = await pool.getConnection(); // Obtener una conexión de la pool
        const result = await db.query(
            `UPDATE categorias SET nombre = ? WHERE id = ?`,
            [nombre, id],
        );
        db.release(); // Liberar la conexión después de usarla
        if (result.affectedRows > 0) {
            res.status(200).send({
                message: 'Categoría actualizada con éxito',
            });
        } else {
            res.status(404).send({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).send({ message: 'Error al actualizar la categoría' });
    }
};

// Función para eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await createPool(); // Obtener el pool de conexiones
        const db = await pool.getConnection(); // Obtener una conexión de la pool
        const result = await db.query(`DELETE FROM categorias WHERE id = ?`, [
            id,
        ]);
        db.release(); // Liberar la conexión después de usarla
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Categoría eliminada con éxito' });
        } else {
            res.status(404).send({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).send({ message: 'Error al eliminar la categoría' });
    }
};
