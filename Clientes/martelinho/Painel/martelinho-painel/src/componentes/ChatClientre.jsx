import React, { useState, useEffect } from 'react';

const ChatCliente = ({ mensagens }) => {
  const [mensagemNova, setMensagemNova] = useState('');

  const handleEnviar = () => {
    if (mensagemNova.trim() !== '') {
      // Aqui futuramente o Samuel poderá mandar a mensagem pro bot ou cliente
      console.log('Mensagem enviada:', mensagemNova);
      setMensagemNova('');
    }
  };

  return (
    <div style={estilos.container}>
      <h3 style={estilos.titulo}>Chat com o Cliente</h3>
      <div style={estilos.janelaChat}>
        {mensagens.length === 0 ? (
          <p style={{ color: '#aaa' }}>Nenhuma mensagem ainda...</p>
        ) : (
          mensagens.map((msg, index) => (
            <div
              key={index}
              style={{
                ...estilos.mensagem,
                alignSelf: msg.tipo === 'cliente' ? 'flex-start' : 'flex-end',
                backgroundColor: msg.tipo === 'cliente' ? '#2c2c2c' : '#FFD700',
                color: msg.tipo === 'cliente' ? '#fff' : '#000',
              }}
            >
              {msg.texto}
            </div>
          ))
        )}
      </div>

      <div style={estilos.inputArea}>
        <input
          type="text"
          value={mensagemNova}
          onChange={(e) => setMensagemNova(e.target.value)}
          placeholder="Digite uma mensagem..."
          style={estilos.input}
        />
        <button onClick={handleEnviar} style={estilos.botao}>Enviar</button>
      </div>
    </div>
  );
};

const estilos = {
  container: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    border: '1px solid #333',
  },
  titulo: {
    marginBottom: 10,
    color: '#FFD700',
  },
  janelaChat: {
    height: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
    border: '1px solid #222',
  },
  mensagem: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 6,
  },
  inputArea: {
    marginTop: 10,
    display: 'flex',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: 6,
  },
  botao: {
    padding: '10px 15px',
    backgroundColor: '#FFD700',
    color: '#000',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default ChatCliente;
