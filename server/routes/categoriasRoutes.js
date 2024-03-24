import express from 'express';
import {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria,
} from '../controllers/categoriasController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Middleware de verificación de token para todas las rutas de categorías
router.use(verifyToken);

// Ruta para crear una nueva categoría
router.post('/', crearCategoria);

// Ruta para obtener todas las categorías
router.get('/', obtenerCategorias);

// Ruta para obtener una categoría específica por su ID
router.get('/:id', obtenerCategoria);

// Ruta para actualizar una categoría por su ID
router.put('/:id', actualizarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/:id', eliminarCategoria);

export default router;
