document.addEventListener("DOMContentLoaded", () => {
  const empresaSelect = document.getElementById("empresa");
  const internalFields = document.getElementById("internalFields");
  const externalFields = document.getElementById("externalFields");
  const form = document.getElementById("leadForm");

  empresaSelect.addEventListener("change", () => {
    const empresa = empresaSelect.value;
    internalFields.classList.toggle("hidden", empresa === "Shopping");
    externalFields.classList.toggle("hidden", empresa !== "Shopping");
  });

function atualizarDiaSemana(dataInputId, diaSemanaId) {
  const dataInput = document.getElementById(dataInputId);
  const diaSemanaEl = document.getElementById(diaSemanaId);
  const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  dataInput.addEventListener("change", () => {
    const data = new Date(dataInput.value + "T00:00:00");
    if (!isNaN(data)) {
      diaSemanaEl.textContent = dias[data.getDay()];
    } else {
      diaSemanaEl.textContent = "";
    }
  });
}


  atualizarDiaSemana("data", "diaSemana");
  atualizarDiaSemana("dataExt", "diaSemanaExt");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const empresa = empresaSelect.value;
    const payload = { empresa };

    if (empresa === "Shopping") {
      payload.nome = document.getElementById("nomeExt").value;
      payload.data = document.getElementById("dataExt").value;
      payload.diaSemana = document.getElementById("diaSemanaExt").textContent;
      payload.visitas = +document.getElementById("visitas").value || 0;
      payload.restricao = +document.getElementById("restricaoExt").value || 0;
      payload.semviabilidade = +document.getElementById("semviabilidadeExt").value || 0;
      payload.consultas = +document.getElementById("consultas").value || 0;
    } else {
      payload.nome = document.getElementById("nome").value;
      payload.data = document.getElementById("data").value;
      payload.diaSemana = document.getElementById("diaSemana").textContent;
      payload.opa = +document.getElementById("opa").value || 0;
      payload.restricao = +document.getElementById("restricao").value || 0;
      payload.semviabilidade = +document.getElementById("semviabilidade").value || 0;
      payload.outros = +document.getElementById("outros").value || 0;
      payload.inativos = +document.getElementById("inativos").value || 0;
    }

    document.getElementById("status").textContent = "Salvando...";

    fetch("https://script.google.com/macros/s/AKfycbwX4_wqfLAxRv9MjmMmoHw6eTmd_U3QwQHC7xTkOyzReZ3IJEU5t8iOquwOWEMQBIYmmQ/exec", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("status").textContent = "Dados salvos com sucesso!";
        form.reset();
        document.getElementById("diaSemana").textContent = "";
        document.getElementById("diaSemanaExt").textContent = "";
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("status").textContent = "Erro ao salvar os dados.";
      });
  });
});
