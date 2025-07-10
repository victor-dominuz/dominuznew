let alarm;

fetch('https://raw.githubusercontent.com/victor-dominuz/chegaai-dados/main/clientes-chegaai.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById('clientes');
    for (const numero in data) {
      const cliente = data[numero];
      const pedido = cliente.pedido || 'Sem pedido';
      const pagamento = cliente.pagamento || 'N/A';
      const status = cliente.status || 'Novo';
      const hora = cliente.hora || 'N/A';
      const modoEntrega = cliente.modoEntrega || 'N/A';

      const tr = document.createElement('tr');
      tr.classList.add('novo');
      tr.innerHTML = `
        <td>${cliente.nomeCliente || 'Não informado'}</td>
        <td>${numero}</td>
        <td>${pedido}</td>
        <td>${modoEntrega}</td>
        <td>${pagamento}</td>
        <td>${status}</td>
        <td>${hora}</td>
        <td><button onclick="iniciarPreparo(this)">Iniciar Preparo</button></td>
      `;
      tbody.appendChild(tr);

      // Tocar alarme irritante enquanto está "novo"
      alarm = new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1152-pristine.mp3');
      alarm.loop = true;
      alarm.play();

      // Remover pedido depois de 30 minutos se finalizado
      setTimeout(() => {
        if (tr.classList.contains('finalizado')) {
          tr.remove();
        }
      }, 30 * 60 * 1000);
    }
  })
  .catch(err => {
    document.getElementById('clientes').innerHTML = `<tr><td colspan="8">Erro ao carregar dados.</td></tr>`;
    console.error(err);
  });

function iniciarPreparo(botao) {
  const tr = botao.closest('tr');
  tr.classList.remove('novo');
  tr.classList.add('preparo');
  tr.querySelector('td:nth-child(6)').textContent = 'Em Preparo';
  botao.textContent = 'Finalizar Pedido';
  botao.onclick = () => finalizarPedido(botao);

  if (alarm) {
    alarm.pause();
    alarm.currentTime = 0;
  }
}

function finalizarPedido(botao) {
  const tr = botao.closest('tr');
  tr.classList.remove('preparo');
  tr.classList.add('finalizado');
  tr.querySelector('td:nth-child(6)').textContent = 'Finalizado';
  botao.remove();
}