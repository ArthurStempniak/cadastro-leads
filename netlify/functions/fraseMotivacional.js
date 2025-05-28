const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    const fraseOriginal = `${data[0].q} — ${data[0].a}`;

    const tradRes = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: fraseOriginal,
        source: "en",
        target: "pt",
        format: "text"
      })
    });

    const tradData = await tradRes.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // <-- ESSENCIAL para liberar CORS
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ frase: tradData.translatedText })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",  // <-- também aqui para resposta de erro
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ erro: "Erro ao carregar ou traduzir a frase." })
    };
  }
};
