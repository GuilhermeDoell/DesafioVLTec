import React from 'react';

const NoteCard = ({ note, onDelete }) => (
  <div>
    <h2>{note.title}</h2>
    <p>{note.description}</p>
    <p>Data de Criação: {new Date(note.createdAt).toLocaleString()}</p>
    <button onClick={() => onDelete(note.id)}>Excluir</button>
  </div>
);

export default NoteCard;