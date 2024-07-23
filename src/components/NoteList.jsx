import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onDelete }) => (
  <div>
    {notes.map((note) => (
      <NoteCard key={note.id} note={note} onDelete={onDelete} />
    ))}
  </div>
);

export default NoteList;