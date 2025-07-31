import React from 'react';
import ChatCliente from './ChatCliente';

function DetalhesCliente({ cliente, onFechar }) {
  return (
    <div style={{
      marginTop: '20px',
      borderTop: '2px solid #FFD700',
      paddingTop: '20px',
      color: '#fff'
    }}>
      <button
        onClick={onFechar}
        style={{
          background: '#FFD700',
          color: '#000',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          marginBottom: '15px',
          cursor: 'pointer'
        }}
      >
        Fechar
      </button>

      <h2>Orçamento para: {cliente.nome}</h2>
      <p>Local: {cliente.local}</p>
      <p>Data: {cliente.data}</p>

      <video
        src={`/videos/${cliente.video}`}
        controls
        width="100%"
        style={{ marginBottom: '15px', borderRadius: '8px' }}
      />

      <p><strong>Histórico:</strong> {cliente.historico}</p>

      <ChatCliente cliente={cliente} />
    </div>
  );
}

export default DetalhesCliente;
