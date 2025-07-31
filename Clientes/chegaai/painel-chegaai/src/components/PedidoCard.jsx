function PedidoCard({ data, onStatusChange }) {
  const { id, nome, numero, pedido, entrega, pagamento, status } = data;

  let statusClass =
    status === 'Finalizado' ? 'finalizado' :
    status === 'Em Preparo' ? 'preparo' : 'novo';

  const proximoTexto =
    status === 'Novo' ? 'Iniciar' :
    status === 'Em Preparo' ? 'Finalizar' : '✓';

  return (
    <tr className={statusClass}>
      <td>{nome}</td>
      <td>{numero}</td>
      <td>{pedido}</td>
      <td>{entrega}</td>
      <td>{pagamento}</td>
      <td>{status}</td>
      <td>
        <button className="botao" onClick={() => onStatusChange(id)}>{proximoTexto}</button>
      </td>
    </tr>
  );
}

export default PedidoCard;
