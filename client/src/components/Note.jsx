import React from 'react';

const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important ? 'Marcar como no importante' : 'Marcar como importante';

    return (
        <li>
            {note.content}
            <button onClick={() => toggleImportance(note.id)}>{label}</button>
            <button onClick={() => deleteNote(note.id)}>Eliminar</button>
        </li>
    );
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    toggleImportance: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    important: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
