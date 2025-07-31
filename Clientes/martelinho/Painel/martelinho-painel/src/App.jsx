// src/App.jsx
import React, { useState } from 'react';
import ClienteCard from './components/ClienteCard';
import DetalhesCliente from './components/DetalhesCliente';
import clientes from './data/clientes-martelinho.json';
import './index.css';

function App() {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const handleSelecionar = (cliente) => {
    setClienteSelecionado(cliente);
  };

  const handleFechar = () => {
    setClienteSelecionado(null);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#FFD700' }}>Painel de Orçamentos</h1>
      <h3 style={{ color: '#aaa' }}>Samuel Martelinho de Ouro</h3>

      {clientes.map((cliente, index) => (
        <ClienteCard key={index} cliente={cliente} onSelecionar={handleSelecionar} />
      ))}

      {clienteSelecionado && (
        <DetalhesCliente cliente={clienteSelecionado} onFechar={handleFechar} />
      )}
    </div>
  );
}

export default App;
