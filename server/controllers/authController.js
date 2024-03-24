import { crearUsuario, obtenerUsuarioPorEmail } from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Función para iniciar sesión
export const iniciarSesion = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const usuario = await obtenerUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(
            contraseña,
            usuario.contraseña,
        );
        if (!contraseñaValida) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        // Crear y firmar el token JWT
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // El token expira en 1 hora
        });

        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al iniciar sesión' });
    }
};

// Función para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await obtenerUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedContraseña = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo usuario en la base de datos
        await crearUsuario(email, hashedContraseña);

        res.status(201).send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al registrar el usuario' });
    }
};
