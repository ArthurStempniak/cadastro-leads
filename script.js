const vendorIds = {
  "Sem Vendedor": 0,
  "Vitor Angeli": 2,
  "ANA MARIA CUNHA": 8,
  "Natalia Gonçalves da Silva": 15,
  "DÉBORA MILENA DE OLIVEIRA": 20,
  "JENNYFER AMARANTE DO NASCIMENTO": 31,
  "Amanda Vitória Souza Pereira": 39,
  "Jean Vitor Velicko": 40,
  "ROSANGELA APARECIDA KECTERIN VAZ": 42,
  "ANDREIA DA LUZ PAZ": 44,
  "DANIELE KETLIN CONCEICAO DE SOUSA": 45,
  "WILLIAN BATISTA CARVALHO": 52,
  "TAINARA CRISTINA VIEIRA": 53,
  "GIAN CARLO VARELA DOS SANTOS": 54
};

document.getElementById("data").addEventListener("change", e => {
  const d = new Date(e.target.value);
  const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  document.getElementById("diaSemana").innerText = `Dia da semana: ${dias[d.getDay()]}`;
});

document.getElementById("leadForm").addEventListener("submit", e => {
  e.preventDefault();

  const empresa = document.getElementById("empresa").value;
  const nome = document.getElementById("nome").value;
  const idVendedor = vendorIds[nome] || 0;

  const dataInput = document.getElementById("data").value;
  const d = new Date(dataInput);
  const dias = ["segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado","domingo"];
  const diaSemana = dias[d.getDay()];

  const payload = {
    empresa,
    nome,
    data: dataInput,
    diaSemana,
    opa: parseInt(document.getElementById("opa").value, 10),
    restricao: parseInt(document.getElementById("restricao").value, 10),
    semviabilidade: parseInt(document.getElementById("semviabilidade").value, 10),
    outros: parseInt(document.getElementById("outros").value, 10),
    inativos: parseInt(document.getElementById("inativos").value, 10),
    idVendedor
  };

  fetch('https://script.google.com/macros/s/AKfycbzPGlAyAdsq32iVC5T1Dj5eT_LrgUBhxYbG6ZABFd9TR0F3RfYV9dEZxoGQ-vUPmdlwjA/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    document.getElementById("status").innerText = "Dados enviados com sucesso!";
    e.target.reset();
    document.getElementById("diaSemana").innerText = "";
  })
  .catch(err => {
    document.getElementById("status").innerText = "Erro ao enviar: " + err;
  });
});