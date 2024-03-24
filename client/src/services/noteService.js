import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes'; // Asegúrate de cambiar esto con la URL de tu backend

// Obtiene todas las notas
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

// Crea una nueva nota
const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

// Actualiza una nota existente
const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Elimina una nota
const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
    return;
};

// Usando exportación nombrada para facilitar la importación selectiva y la claridad
export { getAll, create, update, remove };
