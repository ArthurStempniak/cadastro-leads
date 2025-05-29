const vendorIds = {
  // Mundial / Cosmo
  "ANA MARIA CUNHA": 8,
  "DANIELE KETLIN CONCEICAO DE SOUSA": 45,
  "DÉBORA MILENA DE OLIVEIRA": 20,
  "GIAN CARLO VARELA DOS SANTOS": 54,
  "Natalia Gonçalves da Silva": 15,
  "ROSANGELA APARECIDA KECTERIN VAZ": 42,
  "TAINARA CRISTINA VIEIRA": 53,
  "Vitor Angeli": 2,
  "WILLIAN BATISTA CARVALHO": 52,
  // Shopping
  "Jhonatã Dos Santos": 47,
  "Kawanne Aparecida Oliveira Santos": 51,
  "Nilzete Francisca Prates": 48,
  "Shopping": 0
};

document.getElementById("empresa").addEventListener("change", (e) => {
  const interno = document.getElementById("internalFields");
  const externo = document.getElementById("externalFields");
  if (e.target.value === "Shopping") {
    interno.classList.add("hidden");
    externo.classList.remove("hidden");
  } else {
    interno.classList.remove("hidden");
    externo.classList.add("hidden");
  }
});

function atualizarDiaSemana(inputId, outputId) {
  const inp = document.getElementById(inputId);
  const out = document.getElementById(outputId);
  inp.addEventListener("change", () => {
    const d = new Date(inp.value + "T00:00:00");
    if (!isNaN(d)) {
      const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
      out.textContent = "Dia da semana: " + dias[d.getDay()];
    } else {
      out.textContent = "";
    }
  });
}
atualizarDiaSemana("data", "diaSemana");
atualizarDiaSemana("dataExt", "diaSemanaExt");

document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const emp = document.getElementById("empresa").value;
  const isShop = emp === "Shopping";

  const nome = isShop ? document.getElementById("nomeExt").value : document.getElementById("nome").value;
  const data = isShop ? document.getElementById("dataExt").value : document.getElementById("data").value;
  const diaSemana = isShop ? document.getElementById("diaSemanaExt").textContent.replace("Dia da semana: ", "") : document.getElementById("diaSemana").textContent.replace("Dia da semana: ", "");
  const idVendedor = vendorIds[nome] ?? 0;

  const payload = {
    empresa: emp,
    nome,
    data,
    diaSemana,
    idVendedor,
    // campos internos
    ...( !isShop && {
      opa: +document.getElementById("opa").value || 0,
      restricao: +document.getElementById("restricao").value || 0,
      semviabilidade: +document.getElementById("semviabilidade").value || 0,
      outros: +document.getElementById("outros").value || 0,
      inativos: +document.getElementById("inativos").value || 0
    }),
    // campos externos
    ...( isShop && {
      visitas: +document.getElementById("visitas").value || 0,
      consultas: +document.getElementById("consultas").value || 0,
      restricao: +document.getElementById("restricaoExt").value || 0,
      semviabilidade: +document.getElementById("semviabilidadeExt").value || 0
    })
  };

  document.getElementById("status").textContent = "Enviando...";

  fetch("https://script.google.com/macros/s/AKfycbwX4_wqfLAxRv9MjmMmoHw6eTmd_U3QwQHC7xTkOyzReZ3IJEU5t8iOquwOWEMQBIYmmQ/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(() => {
      document.getElementById("status").textContent = "Salvo com sucesso!";
      e.target.reset();
      document.getElementById("diaSemana").textContent = "";
      document.getElementById("diaSemanaExt").textContent = "";
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("status").textContent = "Erro ao salvar.";
    });

});

async function carregarFraseDoDia() {
  const apiUrl   = "https://zenquotes.io/api/random";
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
  const alvo     = document.getElementById("fraseMotivacional");

  try {
    // 1) Busca frase em inglês via proxy
    const res1    = await fetch(proxyUrl);
    const wrapper = await res1.json();
    const json    = JSON.parse(wrapper.contents);
    const fraseIngles = `${json[0].q} — ${json[0].a}`;

    let fraseFinal = fraseIngles;

    try {
      // 2) Tradução via MyMemory (GET simples)
      const urlTrad = 
        `https://api.mymemory.translated.net/get?` +
        `q=${encodeURIComponent(fraseIngles)}` +
        `&langpair=en|pt`;
      const res2  = await fetch(urlTrad);
      const js2   = await res2.json();
      if (js2.responseData && js2.responseData.translatedText) {
        fraseFinal = js2.responseData.translatedText;
      }
    } catch (errTrad) {
      console.warn("erro na tradução MyMemory:", errTrad);
      // fallback: fica em inglês
    }

    // 3) Exibe
    alvo.textContent = fraseFinal;

  } catch (err) {
    console.error("não carregou frase:", err);
    alvo.textContent = "Erro ao carregar a frase.";
  }
}

window.addEventListener("DOMContentLoaded", carregarFraseDoDia);









