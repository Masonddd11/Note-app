import React from 'react';
import Button from '@mui/material/Button';

function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '10px' }}>{note.title}</h2>
      <p style={{ marginBottom: '20px' }}>{note.content}</p>
      <div style={{ display: 'flex', justifyContent: 'start' , gap:3 }}>
        <Button variant="contained" color="primary" onClick={() => onEdit(note)}>Edit</Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(note)}>Delete</Button>
      </div>
    </div>
  );
}

export default NoteCard;