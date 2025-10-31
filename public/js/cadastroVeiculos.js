document.addEventListener("DOMContentLoaded", () => {
  configurarFormularioModelo();
  carregarModelosDropdown();
  configurarFormularioParametro();
  configurarFormularioLote();
});

function configurarFormularioModelo() {
  const formModelo = document.getElementById("modeloForm");

  formModelo.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nomeModelo = document.getElementById("modelo-nome").value;
    const statusModelo = document.getElementById("modelo-status").value;
    const versaoPiloto = document.getElementById("modelo-versao-piloto").value;
    const id_empresa = sessionStorage.getItem("id_empresa_ss");

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
          idEmpresa: id_empresa,
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
    window.location.reload();
  });
}

async function carregarModelosDropdown() {
  const fkEmpresa = sessionStorage.getItem("id_empresa_ss");

  if (!fkEmpresa) {
    console.error(
      "Não foi possível carregar modelos: fkEmpresa não encontrado na sessão."
    );
    return;
  }

  try {
    const resposta = await fetch(
      `/cadastroVeiculos/listarModelosPorEmpresa/${fkEmpresa}`
    );

    if (resposta.ok) {
      const modelos = await resposta.json();

      const selectParamModelo = document.getElementById("param-select-modelo");
      const selectVeiculoModelo = document.getElementById("veiculo-modelo");

      selectParamModelo.innerHTML =
        '<option value="">Selecione um modelo...</option>';
      selectVeiculoModelo.innerHTML =
        '<option value="">Selecione o Modelo</option>';

      modelos.forEach((modelo) => {
        const option = document.createElement("option");
        option.value = modelo.id;
        option.textContent = modelo.nome;

        selectParamModelo.appendChild(option.cloneNode(true));
        selectVeiculoModelo.appendChild(option);
      });
    } else {
      const erroMsg = await resposta.text();
      throw new Error("Erro da API ao listar modelos: " + erroMsg);
    }
  } catch (error) {
    console.error("Erro ao carregar modelos:", error);
  }
}

function configurarFormularioParametro() {
  const formParametro = document.getElementById("parametroForm");

  formParametro.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dadosFormulario = {
      fkModelo: document.getElementById("param-select-modelo").value,
      fkHardware: document.getElementById("param-select-hardware").value,
      unidadeMedida: document.getElementById("param-unidade-medida").value,
      minimo: document.getElementById("param-limite-minimo").value,
      neutro: document.getElementById("param-limite-neutro").value,
      atencao: document.getElementById("param-limite-atencao").value,
      critico: document.getElementById("param-limite-critico").value,
    };

    if (
      !dadosFormulario.fkModelo ||
      !dadosFormulario.fkHardware ||
      !dadosFormulario.unidadeMedida
    ) {
      alert(
        "Erro: Modelo, Hardware e Unidade de Medida devem ser preenchidos!"
      );
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarParametro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosFormulario),
      });

      if (resposta.ok) {
        alert("Parâmetro salvo com sucesso!");
        formParametro.reset();

        atualizarUnidadesSimples();
      } else {
        const erroMsg = await resposta.text();
        throw new Error("Erro da API: " + erroMsg);
      }
    } catch (error) {
      console.error("Erro ao salvar parâmetro:", error);
      alert("Falha ao salvar parâmetro: " + error.message);
    }
  });
}

function configurarFormularioLote() {
  const formLote = document.getElementById("loteForm");

  formLote.addEventListener("submit", async function (event) {
    event.preventDefault();

    const codigoLote = document.getElementById("lote-codigo").value;
    const dataFabricacao = document.getElementById(
      "lote-data-fabricacao"
    ).value;
    const statusLote = document.getElementById("lote-status").value;

    const idEmpresa = sessionStorage.getItem("id_empresa_ss");

    if (!codigoLote || !dataFabricacao || !statusLote) {
      alert("Erro: Todos os campos do lote são obrigatórios!");
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarLote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo_lote: codigoLote,
          data_fabricacao: dataFabricacao,
          status: statusLote,
          idEmpresa: idEmpresa,
        }),
      });

      if (resposta.ok) {
        alert("Lote cadastrado com sucesso!");
        formLote.reset();
      } else {
        const erroMsg = await resposta.text();
        throw new Error("Erro da API: " + erroMsg);
      }
    } catch (error) {
      console.error("Erro ao cadastrar lote:", error);
      alert("Falha ao cadastrar lote: " + error.message);
    }
  });
}
