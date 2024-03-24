import { useState, useEffect } from 'react';
import NoteList from './NoteList.jsx';
import noteService from '../services/noteService.js';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
                setLoading(false);
            });
    }, []);

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: false,
            date: new Date().toISOString(),
        };

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            });
    };

    const deleteNote = (id) => {
        noteService
            .remove(id)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    return (
        <div>
            <h1>Notas</h1>
            {loading ? <p>Cargando notas...</p> : <NoteList notes={notes} toggleImportance={toggleImportanceOf} deleteNote={deleteNote} />}
            
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder="Escribe una nueva nota"
                />
                <button type="submit">Guardar Nota</button>
            </form>
        </div>
    );
};

export default App;

