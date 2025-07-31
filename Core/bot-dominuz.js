const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;

// ✅ Carrega o mapa de bots com base no número (usando JSON da raiz)
const mapaBots = require(path.join(__dirname, '..', 'mapaBots.json'));
console.log('✅ mapaBots carregado:', mapaBots);

// 🚀 Rota principal que recebe mensagens da Twilio
app.post('/webhook', async (req, res) => {
  const numeroTwilio = req.body.From || '';
  const numeroLimpo = numeroTwilio.replace('whatsapp:', '');

  console.log('📩 Número recebido da Twilio:', numeroTwilio);
  console.log('🧼 Número limpo:', numeroLimpo);

  const nomeModulo = mapaBots[numeroLimpo];

  if (!nomeModulo) {
    console.log('❌ Número não encontrado no mapaBots.');
    return res.send('<Response><Message>Bot não configurado para esse número.</Message></Response>');
  }

  console.log(' Módulo encontrado no mapa: ${nomeModulo}');

  const nomeCliente = nomeModulo.replace('bot-', '');

  // 📁 Caminho do arquivo do bot (ex: clientes/martelinho/bot-martelinho.js)
  const caminhoModulo = path.join(__dirname, '..', 'clientes', nomeCliente, '${nomeModulo}.js');
  console.log('📂 Caminho do require:', caminhoModulo);

  let modulo;
  try {
    modulo = require(caminhoModulo);
  } catch (erro) {
    console.error('❌ Erro ao carregar módulo: ${erro.message}');
    return res.send('<Response><Message>Erro interno ao carregar o módulo do bot.</Message></Response>');
  }

  // 📁 Caminho do JSON com histórico dos clientes
  const caminhoJson = path.join(__dirname, '..', 'clientes', nomeCliente, clientes-'${nomeCliente}.json');

  let clientes = {};
  try {
    if (fs.existsSync(caminhoJson)) {
      const dados = fs.readFileSync(caminhoJson);
      clientes = JSON.parse(dados);
    }
  } catch (erro) {
    console.error('❌ Erro ao carregar o JSON do cliente: ${erro.message}');
  }

  const resposta = await modulo.atender(req.body, clientes, caminhoJson);

  res.set('Content-Type', 'text/xml');
  res.send(<Response><Message>${resposta}</Message></Response>);
});

// 🌐 Inicia o servidor
app.listen(port, () => {
  console.log('💡 Dominuz ativo na porta ${port}');
});
