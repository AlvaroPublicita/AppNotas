const NoteList = ({ notes, toggleImportance, deleteNote }) => {
    return (
        <ul>
            {notes.map(note => 
                <Note key={note.id} note={note} toggleImportance={toggleImportance} deleteNote={deleteNote} />
            )}
        </ul>
    );
};
