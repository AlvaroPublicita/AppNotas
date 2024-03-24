import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './server/routes/authRoutes.js';
import notasRoutes from './server/routes/notasRoutes.js';
import categoriasRoutes from './server/routes/categoriasRoutes.js';

// Configuración de variables de entorno
dotenv.config();
const app = express(); // Crear una instancia de express

app.use(cors()); // Para poder hacer peticiones desde cualquier origen y evitar problemas de conectividad
app.use(express.json()); // Para poder recibir JSON en el body de las peticiones

// Rutas
app.use('/api/auth', authRoutes); // Todas las rutas que empiecen con /api/auth
app.use('/api/notas', notasRoutes); // Todas las rutas que empiecen con /api/notas
app.use('/api/categorias', categoriasRoutes); // Todas las rutas que empiecen con /api/categorias

const PORT = process.env.PORT || 3000; // Puerto en el que va a correr el servidor

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
