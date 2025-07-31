require('dotenv').config();
console.log("Bot do Chega Aí iniciado com sucesso");
const { Configuration, OpenAIApi } = require('openai');
const twilio = require('twilio');
const fs = require('fs');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const saudacoes = ["oi", "olá", "e aí", "boa", "opa", "blz", "beleza", "tudo bem"];
const emojis = ["😀", "😊", "👍", "🙏", "👏", "🙌", "👋"];
const linkCardapio = "https://dominuztech.com/cardapio-chegaai/";
const chavePix = "CHAVE_COPIA_E_COLA"; // Adicionar real depois

const saudacaoPorHorario = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
};

const detectarFormaPagamento = (texto) => {
  const msg = texto.toLowerCase();
  if (msg.includes("entrega") || msg.includes("delivery")) return "delivery";
  return null;
};

const detectarCardapio = (texto) => {
  return texto.toLowerCase().includes("cardápio") || texto.toLowerCase().includes("menu");
};

const detectarSaudacao = (texto) => {
  const msg = texto.toLowerCase();
  return saudacoes.some(s => msg.includes(s)) || emojis.some(e => msg.includes(e));
};

const gerarRespostaChatGPT = async (mensagem, nome) => {
  const prompt = `
Você é um atendente educado de um restaurante chamado Chega Aí.
Responda de forma curta, simpática e natural, como se estivesse falando no WhatsApp.
Mensagem do cliente: "${mensagem}"
Cliente: ${nome}
`;
  const res = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });
  return res.data.choices[0].message.content.trim();
};

async function enviarMensagem(texto, numero) {
  await client.messages.create({
    body: texto,
    from: process.env.TWILIO_NUMBER,
    to: `whatsapp:${numero}`,
  });
}

async function processarMensagem({ nome, texto, numero }) {
  const msg = texto.toLowerCase();

  if (detectarSaudacao(msg)) {
    const saudacao = saudacaoPorHorario();
    return await enviarMensagem(`${saudacao}, ${nome}! Como posso te ajudar hoje? 😄`, numero);
  }

  if (detectarCardapio(msg)) {
    return await enviarMensagem(`Claro! Aqui está nosso cardápio digital 📲👇\n${linkCardapio}`, numero);
  }

  if (detectarFormaPagamento(msg) === "delivery") {
    return await enviarMensagem(`Perfeito, vou preparar seu pedido para entrega. Segue a chave PIX para pagamento:\n\n🔑 ${chavePix}`, numero);
  }

  const resposta = await gerarRespostaChatGPT(texto, nome);
  await enviarMensagem(resposta, numero);}