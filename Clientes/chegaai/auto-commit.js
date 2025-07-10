const fs = require('fs');
const { exec } = require('child_process');

// Caminho do arquivo que queremos monitorar
const caminhoArquivo = './Bot/clientes/clientes-chegaai.json';
let ultimaVersao = fs.readFileSync(caminhoArquivo, 'utf-8');

// Função para executar comandos Git
function executarComando(comando) {
  exec(comando, (err, stdout, stderr) => {
    if (err) {
      console.error(`Erro ao executar: ${comando}`, err);
      return;
    }
    console.log(stdout);
  });
}

// Monitorar mudanças no arquivo
fs.watchFile(caminhoArquivo, { interval: 3000 }, () => {
  const novaVersao = fs.readFileSync(caminhoArquivo, 'utf-8');

  if (novaVersao !== ultimaVersao) {
    ultimaVersao = novaVersao;

    const data = new Date().toLocaleString('pt-BR');
    console.log(`[${data}] Detecção de mudança no arquivo. Comitando...`);

    executarComando('git add .');
    executarComando(`git commit -m "Atualização automática: ${data}"`);
    executarComando('git push');
  }
});