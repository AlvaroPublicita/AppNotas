// Registro de usuario

import axios from 'axios';

// Registro de usuario
const register = async (newUser) => {
    const response = await axios.post(baseUrl, newUser); // baseUrl es una variable que contiene la URL de la API
    return response.data;
};

// Iniciar sesión

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

// Obtener todas las notas

const baseUrl = 'http://localhost:8000/notes';

const getAll = async (token) => {
    const response = await axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`, // token es un string que contiene el token de autenticación
        },
    });
    return response.data;
};

// Crear una nueva nota

const create = async (newNote, token) => {
    const response = await axios.post(baseUrl, newNote, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Actualizar una nota existente

const update = async (id, updatedNote, token) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedNote, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Eliminar una nota

const remove = async (id, token) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Usando exportación nombrada para facilitar la importación selectiva y la claridad

export { register, login, getAll, create, update, remove };

// Esto interactua con:
// Path: client/src/services/noteService.js
// Path: client/src/contexts/UserContext.jsx
// Path: client/src/components/App.jsx
