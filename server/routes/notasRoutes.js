import express from 'express';
import {
    crearNota,
    obtenerNotas,
    obtenerNota,
    actualizarNota,
    eliminarNota,
    marcarNotaPublica, // Importa la función del controlador para marcar una nota como pública
    crearNotaConImagen, // Importa la función del controlador para crear una nota con imagen
} from '../controllers/notasController.js';
import { verifyToken } from '../middleware/verifyToken.js'; // Asegúrate de tener este middleware para verificar el token JWT.

const router = express.Router();

// Crea una nota
router.post('/', verifyToken, crearNota);

// Obtiene todas las notas del usuario
router.get('/', verifyToken, obtenerNotas);

// Obtiene una nota específica por su ID
router.get('/:id', verifyToken, obtenerNota);

// Actualiza una nota por su ID
router.put('/:id', verifyToken, actualizarNota);

// Elimina una nota por su ID
router.delete('/:id', verifyToken, eliminarNota);

// Ruta para obtener todas las notas de un usuario
router.get('/notas', verifyToken, obtenerNotas);

// Ruta para marcar una nota como pública
router.put('/notas/:id/marcar-publica', verifyToken, marcarNotaPublica);

// Ruta para crear una nota con imagen
router.post('/notas-con-imagen', verifyToken, crearNotaConImagen);

export default router;
