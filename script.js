// Mapeamento nome → ID conforme sua fórmula IFS
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

// Exibe o dia da semana
document.getElementById("data").addEventListener("change", e => {
  const d = new Date(e.target.value);
  const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  document.getElementById("diaSemana").innerText = `Dia da semana: ${dias[d.getDay()]}`;
});

// Envio do formulário
document.getElementById("leadForm").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idVendedor = vendorIds[nome] ?? 0;

  const dataInput = document.getElementById("data").value;               // "YYYY-MM-DD"
  const d = new Date(dataInput);
  const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  const diaSemana = dias[d.getDay()];

  const payload = {
    nome,
    data: dataInput,
    diaSemana,
    opa: document.getElementById("opa").value,
    restricao: document.getElementById("restricao").value,
    semviabilidade: document.getElementById("semviabilidade").value,
    outros: document.getElementById("outros").value,
    inativos: document.getElementById("inativos").value,
    idVendedor
  };

  fetch('https://script.google.com/macros/s/AKfycbz5jhIwd4EGdGIFSzsOjFeTZrk7RphCHCjHabWP6656t425WF74D7xhbjoh9_xN6g5g/exec', {
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
