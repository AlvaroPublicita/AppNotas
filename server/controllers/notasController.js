import { createPool } from '../db/db.js';
import multer from 'multer';
import path from 'path';

// Crear el pool de conexiones
const pool = await createPool();

// Función para crear una nota
export const crearNota = async (req, res) => {
    const { titulo, texto, categoria_id, publica } = req.body;
    try {
        await pool.query(
            `INSERT INTO notas (titulo, texto, categoria_id, usuario_id, publica) VALUES (?, ?, ?, ?, ?)`,
            [titulo, texto, categoria_id, req.usuarioId, publica],
        );
        res.status(201).send({ message: 'Nota creada con éxito!' });
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).send({ message: 'Error al crear la nota' });
    }
};

// Función para obtener todas las notas
export const obtenerNotas = async (req, res) => {
    try {
        const [notas] = await pool.query(
            // Destructuring para obtener el primer elemento del array
            `SELECT id, titulo FROM notas WHERE usuario_id = ?`, // Seleccionar solo el id y el título
            [req.usuarioId], // Pasar el ID del usuario como parámetro
        );
        res.status(200).send(notas); // Enviar solo el array de notas al cliente
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las notas:', error);
        res.status(500).send({ message: 'Error al obtener las notas' });
    }
};

// Función para obtener una nota por su ID
export const obtenerNota = async (req, res) => {
    const { id } = req.params;
    try {
        const [nota] = await pool.query(
            `SELECT * FROM notas WHERE id = ? AND usuario_id = ?`,
            [id, req.usuarioId],
        );
        if (nota.length > 0) {
            res.status(200).send(nota[0]);
        } else {
            res.status(404).send({ message: 'Nota no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la nota:', error);
        res.status(500).send({ message: 'Error al obtener la nota' });
    }
};

// Función para actualizar una nota
export const actualizarNota = async (req, res) => {
    const { id } = req.params;
    const { titulo, texto, categoria_id, publica } = req.body;
    try {
        const result = await pool.query(
            `UPDATE notas SET titulo = ?, texto = ?, categoria_id = ?, publica = ? WHERE id = ? AND usuario_id = ?`,
            [titulo, texto, categoria_id, publica, id, req.usuarioId],
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Nota actualizada con éxito' });
        } else {
            res.status(404).send({ message: 'Nota no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).send({ message: 'Error al actualizar la nota' });
    }
};
// Función para marcar una nota como pública
export const marcarNotaPublica = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `UPDATE notas SET publica = 1 WHERE id = ? AND usuario_id = ?`,
            [id, req.usuarioId],
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Nota marcada como pública' });
        } else {
            res.status(404).send({ message: 'Nota no encontrada' });
        }
    } catch (error) {
        console.error('Error al marcar la nota como pública:', error);
        res.status(500).send({
            message: 'Error al marcar la nota como pública',
        });
    }
};

// Función para marcar una nota como privada
export const marcarNotaPrivada = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `UPDATE notas SET publica = 0 WHERE id = ? AND usuario_id = ?`,
            [id, req.usuarioId],
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Nota marcada como privada' });
        } else {
            res.status(404).send({ message: 'Nota no encontrada' });
        }
    } catch (error) {
        console.error('Error al marcar la nota como privada:', error);
        res.status(500).send({
            message: 'Error al marcar la nota como privada',
        });
    }
};

// Función para eliminar una nota
export const eliminarNota = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `DELETE FROM notas WHERE id = ? AND usuario_id = ?`,
            [id, req.usuarioId], // Eliminar solo la nota del usuario autenticado
        );

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Nota eliminada con éxito' });
        } else {
            res.status(404).send({ message: 'Nota no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        res.status(500).send({ message: 'Error al eliminar la nota' });
    }
};

// Función para obtener todas las notas públicas
export const obtenerNotasPublicas = async (req, res) => {
    try {
        const [notas] = await pool.query(
            `SELECT id, titulo FROM notas WHERE publica = 1`,
        );
        res.status(200).send(notas);
    } catch (error) {
        console.error('Error al obtener las notas públicas:', error);
        res.status(500).send({
            message: 'Error al obtener las notas públicas',
        });
    }
};

// Función para obtener todas las notas de una categoría
export const obtenerNotasPorCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const [notas] = await pool.query(
            `SELECT id, titulo FROM notas WHERE categoria_id = ? AND usuario_id = ?`,
            [id, req.usuarioId],
        );
        res.status(200).send(notas);
    } catch (error) {
        console.error('Error al obtener las notas por categoría:', error);
        res.status(500).send({
            message: 'Error al obtener las notas por categoría',
        });
    }
};
// Función para obtener todas las notas públicas de una categoría
export const obtenerNotasPublicasPorCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const [notas] = await pool.query(
            `SELECT id, titulo FROM notas WHERE categoria_id = ? AND publica = 1`,
            [id],
        );
        res.status(200).send(notas);
    } catch (error) {
        console.error(
            'Error al obtener las notas públicas por categoría:',
            error,
        );
        res.status(500).send({
            message: 'Error al obtener las notas públicas por categoría',
        });
    }
};
// Función para obtener todas las notas de un usuario
export const obtenerNotasPorUsuario = async (req, res) => {
    try {
        const [notas] = await pool.query(
            `SELECT id, titulo FROM notas WHERE usuario_id = ?`,
            [req.usuarioId],
        );
        res.status(200).send(notas);
    } catch (error) {
        console.error('Error al obtener las notas por usuario:', error);
        res.status(500).send({
            message: 'Error al obtener las notas por usuario',
        });
    }
};

// Configuración de multer para almacenar los archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Ruta donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Sufijo único para el nombre del archivo
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo con el sufijo único
    },
});

// Middleware de multer para manejar la carga de archivos
const upload = multer({ storage: storage }).single('imagen'); // 'imagen' es el nombre del campo en el formulario de carga

// Función para crear una nota con imagen
export const crearNotaConImagen = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Si ocurre un error con multer
                console.error('Error al cargar el archivo:', err);
                return res
                    .status(500)
                    .send({ message: 'Error al cargar el archivo' });
            } else if (err) {
                // Si ocurre otro tipo de error
                console.error('Error al cargar el archivo:', err);
                return res
                    .status(500)
                    .send({ message: 'Error al cargar el archivo' });
            }

            // Si se cargó el archivo correctamente
            const { titulo, texto, categoria_id, publica } = req.body;
            const imagenUrl = req.file ? req.file.path : null; // Obtener la ruta del archivo cargado
            await pool.query(
                `INSERT INTO notas (titulo, texto, categoria_id, usuario_id, publica, imagen) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    titulo,
                    texto,
                    categoria_id,
                    req.usuarioId,
                    publica,
                    imagenUrl,
                ], // Guardar la URL de la imagen en la base de datos
            );
            res.status(201).send({ message: 'Nota creada con éxito!' });
        });
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).send({ message: 'Error al crear la nota' });
    }
};
