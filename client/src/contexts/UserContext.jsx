import React, { createContext, useContext, useState, useEffect } from 'react';
import noteService from '../services/noteService';

// Creamos el contexto de usuario
export const UserContext = createContext();

// Componente proveedor de contexto para manejar la autenticación del usuario
export const UserProvider = ({ children }) => {
    // Declaramos variables de estado para el token y el usuario
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // Función para guardar el token en el local storage
    const saveToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    // Función para guardar el usuario en el local storage
    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    // Función para borrar el token y el usuario del local storage
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    // Pasamos los valores del estado y las funciones a los componentes hijos
    return (
        <UserContext.Provider value={{ token, user, saveToken, saveUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => {
    return useContext(UserContext);
};

// Componente principal de la aplicación que muestra una lista de notas y permite agregar nuevas notas
const App = () => {
    const { token } = useUser(); // Obtengo el token de autenticación del contexto de usuario
    const [notes, setNotes] = useState([]); // Estado para almacenar las notas
    const [newNote, setNewNote] = useState(''); // Estado para almacenar la nueva nota
    const [loading, setLoading] = useState(false); // Estado para indicar si se están cargando las notas

    // Función para cargar las notas desde el servidor
    useEffect(() => {
        setLoading(true);
        noteService.getAll(token)
            .then(initialNotes => {
                setNotes(initialNotes);
                setLoading(false);
            });
    }, [token]); // Se ejecuta cada vez que cambia el token

    // Función para manejar el cambio en el input de la nueva nota
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    // Función para agregar una nueva nota
    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: false,
            date: new Date().toISOString(),
        };

        noteService
            .create(noteObject, token)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });
    };

    // Función para cambiar la importancia de una nota
    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote, token)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            });
    };

    // Función para eliminar una nota
    const deleteNote = (id) => {
        noteService
            .remove(id, token)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    return (
        <div>
            <h1>Notas</h1>
            <NoteList
                notes={notes}
                handleNoteChange={handleNoteChange}
                addNote={addNote}
                toggleImportanceOf={toggleImportanceOf}
                deleteNote={deleteNote}
                newNote={newNote}
                loading={loading}
            />
        </div>
    );
};

export default App;


// Esto interactua con:
// Path: client/src/services/noteService.js
// Path: client/src/contexts/UserContext.jsx
// Path: client/src/components/NoteList.jsx
// Path: client/src/components/Note.jsx

// dudas:
// importaciones con react generan error
// uso de hooks en el proyecto
// uso de contextos en el proyecto - Comprendo de manera parcial

