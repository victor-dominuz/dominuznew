const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// CAMINHOS
const painelPath = path.join(__dirname, 'painel');
const manualPath = path.join(__dirname, 'manual.json');

// SERVE O PAINEL WEB
app.use('/', express.static(painelPath));

// API PARA ATUALIZAR manual.json
app.post('/api/manual', (req, res) => {
  const { numero, status } = req.body;

  let manual = fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath))
    : {};

  if (status) {
    manual[numero] = true;
  } else {
    delete manual[numero];
  }

  fs.writeFileSync(manualPath, JSON.stringify(manual, null, 2));
  res.json({ ok: true });
});

// API PARA CONSULTAR manual.json (opcional)
app.get('/api/manual', (req, res) => {
  const manual = fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath))
    : {};
  res.json(manual);
});

// INICIA O SERVIDOR
const PORT = 3001; // porta exclusiva pro martelinho
app.listen(PORT, () => {
  console.log(`🟢 Painel Martelinho rodando em http://localhost:${PORT}`);
});