const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gerarRespostaGPT(promptBase, mensagem) {
  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: promptBase },
        { role: "user", content: mensagem }
      ]
    });

    return resposta.choices[0].message.content;
  } catch (err) {
    console.error("❌ Erro no GPT:", err.message);
    return "Desculpe, tive um erro ao processar sua mensagem. Pode repetir?";
  }
}

module.exports = gerarRespostaGPT;