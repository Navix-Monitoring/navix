document.addEventListener("DOMContentLoaded", () => {
  configurarFormularioModelo();
});

function configurarFormularioModelo() {
  const formModelo = document.getElementById("modeloForm");

  formModelo.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nomeModelo = document.getElementById("modelo-nome").value;
    const statusModelo = document.getElementById("modelo-status").value;
    const versaoPiloto = document.getElementById("modelo-versao-piloto").value;

    if (!nomeModelo || !statusModelo || !versaoPiloto) {
      alert("Erro: Todos os campos do modelo são obrigatórios!");
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarModelo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeModelo,
          versaoPilotoAutomatico: versaoPiloto,
          status: statusModelo,
        }),
      });

      if (resposta.ok) {
        alert("Modelo cadastrado com sucesso!");
        formModelo.reset();
      } else {
        const erroMsg = await resposta.text();
        throw new Error("Erro da API: " + erroMsg);
      }
    } catch (error) {
      console.error("Erro no cadastro do modelo:", error);
      alert("Falha ao cadastrar: " + error.message);
    }
  });
}
