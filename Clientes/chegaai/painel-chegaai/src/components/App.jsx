import './App.css';
import PedidoCard from './PedidoCard';
import logoChegaAi from '../assets/logo-chegaai.png';
import { useState, useEffect } from 'react';

function App() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = () => {
      fetch('/clientes/clientes-chegaai.json')
        .then(res => res.json())
        .then(data => {
          setPedidos(data.pedidos || []);
        });
    };

    fetchPedidos();
    const interval = setInterval(fetchPedidos, 3000); // atualiza a cada 3s

    return () => clearInterval(interval);
  }, []);

  const atualizarStatus = (id) => {
    setPedidos(prev =>
      prev.map(p => {
        if (p.id === id) {
          let novoStatus =
            p.status === 'Novo' ? 'Em Preparo' :
            p.status === 'Em Preparo' ? 'Finalizado' :
            'Finalizado';
          return { ...p, status: novoStatus };
        }
        return p;
      })
    );
  };

  return (
    <>
      <div className="topo">
        <img src={logoChegaAi} alt="Logo Chega.ai" />
      </div>

      <div className="painel">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>WhatsApp</th>
              <th>Pedido</th>
              <th>Modo</th>
              <th>Pagamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                data={pedido}
                onStatusChange={atualizarStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
