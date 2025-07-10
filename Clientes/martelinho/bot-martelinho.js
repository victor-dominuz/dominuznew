const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const clientesPath = path.join(__dirname, '../clientes/martelinho/clientes-martelinho.json');
const relatorioPath = path.join(__dirname, '../clientes/martelinho/relatorios/');

const config = {
  nome_empresa: "Samuel Martelinho de Ouro",
  nome_dono: "Samuel",
  numero_dono: "5551980440747",
  salvar_dados: true,
  usar_nome_cliente: true,
  gerar_planilha_mensal: true,
  horario_atendimento: {
    dias: "Seg a Sex",
    semana: "07:30 às 19:30"
  },
  mensagem_boas_vindas: {
    manha: "Bom dia! Pode me mandar um vídeo do amassado mostrando de perto pra eu fazer uma análise inicial.",
    tarde: "Boa tarde! Pode me enviar um vídeo do amassado mostrando os detalhes pra eu analisar.",
    noite: "Boa noite! Se puder me mandar um vídeo do amassado, consigo fazer uma análise inicial aqui."
  },
  mensagem_fora_horario: "Opa, agora estou fora do horário de atendimento. Retorno assim que possível em horário comercial, beleza?",
  resposta_foto_recebida: "Recebido. Se conseguir enviar um vídeo do amassado, facilita bastante pra eu analisar e estimar o valor.",
  mensagem_video_recebido: "Analisando aqui... consigo te passar um valor aproximado com base no vídeo. O orçamento final eu confirmo pessoalmente, com análise no local usando as ferramentas adequadas.",
  mensagem_interesse_localizacao: "Onde o carro está no momento? Assim consigo ver a melhor forma de atender.",
  mensagem_regiao_atendida: "Atendo toda a região do Vale do Sinos e Paranhana com serviço delivery.",
  delay_resposta_min: 5,
  delay_resposta_max: 23,
  simular_digitando: true,
  usar_chatgpt: true,
  prompt_base: "Você é o Samuel, especialista em martelinho de ouro com mais de 15 anos de experiência. Você atende clientes pelo WhatsApp de forma simples, educada e direta, sempre pedindo um vídeo do amassado para avaliar o dano. O atendimento é focado em remover amassados sem pintura, na região do Vale do Sinos e Paranhana (RS), com serviço delivery. Quando o cliente perguntar qualquer coisa, responda de forma natural, como se fosse o próprio Samuel explicando."
};

// 📦 Registrar atendimento
function registrarAtendimento(numero, dados) {
  let base = {};
  if (fs.existsSync(clientesPath)) {
    try {
      base = JSON.parse(fs.readFileSync(clientesPath, 'utf-8'));
    } catch (e) {
      console.error('Erro ao ler JSON dos clientes:', e);
      base = {};
    }
  }

  const numeroLimpo = numero.replace(/\D/g, '');
  if (!base[numeroLimpo]) base[numeroLimpo] = [];

  base[numeroLimpo].push({
    data: new Date().toLocaleDateString("pt-BR"),
    ...dados
  });

  fs.writeFileSync(clientesPath, JSON.stringify(base, null, 2));
}

// 📊 Gerar planilha mensal
function gerarPlanilhaMensal() {
  if (!fs.existsSync(clientesPath)) return;

  const clientes = JSON.parse(fs.readFileSync(clientesPath));
  const registros = [];

  for (const numero in clientes) {
    clientes[numero].forEach(atendimento => {
      registros.push({
        Número: numero,
        Data: atendimento.data || '',
        Local: atendimento.local || '',
        Cliente: atendimento.cliente || '',
        Carro: atendimento.carro || '',
        Placa: atendimento.placa || '',
        "Qtd de Peças": atendimento.pecas || '',
        Valor: atendimento.valor || ''
      });
    });
  }

  const planilha = xlsx.utils.json_to_sheet(registros);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, planilha, 'Atendimentos');

  const mes = new Date().toLocaleDateString("pt-BR").split("/")[1];
  if (!fs.existsSync(relatorioPath)) fs.mkdirSync(relatorioPath);
  xlsx.writeFile(workbook, `${relatorioPath}atendimentos-martelinho-${mes}.xlsx`);
  console.log("✅ Planilha gerada com sucesso!");
}

// 🧠 Função GPT exportável
async function gerarRespostaGPT(msg) {
  const resposta = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: config.prompt_base },
      { role: "user", content: msg }
    ]
  });
  return resposta.choices[0].message.content;
}

module.exports = {
  config,
  registrarAtendimento,
  gerarPlanilhaMensal,
  gerarRespostaGPT
};
