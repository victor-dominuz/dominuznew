const fs = require('fs');
const { exec } = require('child_process');

const arquivo = '.Bot/clientes/clientes-chegaai.json';
let ultimaVersao = fs.readFileSync(arquivo, 'utf8');

fs.watchFile(arquivo, (curr, prev) => {
  const novaVersao = fs.readFileSync(arquivo, 'utf8');
  if (novaVersao !== ultimaVersao) {
    ultimaVersao = novaVersao;
    console.log('Alteração detectada, enviando para o GitHub...');

    exec(`git add ${arquivo} && git commit -m "update automático" && git push`, (err, stdout, stderr) => {
      if (err) {
        console.error('Erro ao fazer push:', stderr);
        return;
      }
      console.log('Push concluído com sucesso!');
    });
  }
});