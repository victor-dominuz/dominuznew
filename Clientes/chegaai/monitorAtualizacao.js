const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const git = simpleGit();
const arquivoJSON = path.join(__dirname, 'clientes', 'clientes-chegaai.json');

console.log('Monitorando alterações no clientes-chegaai.json a cada 30 segundos...');

async function monitorarArquivo() {
  try {
    const data = fs.readFileSync(arquivoJSON, 'utf8');
    await git.add(arquivoJSON);
    await git.commit('Atualização automática de novo cliente');
    await git.push('origin', 'main');
    console.log('Atualizado no GitHub e Vercel!');
  } catch (error) {
    console.error('Erro ao atualizar:', error.message);
  }
}

// Executa a primeira vez imediatamente
monitorarArquivo();

// Depois a cada 30 segundos (30000 milissegundos)
setInterval(monitorarArquivo, 30000);