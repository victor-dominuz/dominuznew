import React from 'react';

function ClienteCard({ cliente, onSelecionar }) {
  return (
    <div
      onClick={() => onSelecionar(cliente)}
      style={{
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: '#1f1f1f',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
      }}
    >
      <h3>{cliente.nome}</h3>
      <p>Status: {cliente.status}</p>
      <p>Data: {cliente.data}</p>
      <p>Local: {cliente.local}</p>
    </div>
  );
}

export default ClienteCard;
