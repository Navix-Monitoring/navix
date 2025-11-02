document.addEventListener("DOMContentLoaded", () => {
  configurarFormularioModelo();
  carregarModelosDropdown();
  configurarFormularioParametro();
  configurarFormularioLote();
  carregarLotesDropdown();
  configurarFormularioVeiculo();
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
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Todos os campos do modelo são obrigatórios!'
      });
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarModelo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeModelo,
          versaoPilotoAutomatico: versaoPiloto,
          status: statusModelo,
          idEmpresa: id_empresa,
        }),
      });

      if (resposta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Modelo cadastrado!',
          text: 'O modelo foi cadastrado com sucesso.'
        }).then(() => {
          formModelo.reset();
          window.location.reload();
        });
      } else {
        const erroMsg = await resposta.text();
        throw new Error(erroMsg);
      }
    } catch (error) {
      console.error("Erro no cadastro do modelo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Falha ao cadastrar',
        text: error.message
      });
    }
  });
}

async function carregarModelosDropdown() {
  const fkEmpresa = sessionStorage.getItem("id_empresa_ss");
  if (!fkEmpresa) return console.error("fkEmpresa não encontrado na sessão.");

  try {
    const resposta = await fetch(`/cadastroVeiculos/listarModelosPorEmpresa/${fkEmpresa}`);
    if (!resposta.ok) throw new Error(await resposta.text());

    const modelos = await resposta.json();
    const selectParamModelo = document.getElementById("param-select-modelo");
    const selectVeiculoModelo = document.getElementById("veiculo-modelo");

    selectParamModelo.innerHTML = '<option value="">Selecione um modelo...</option>';
    selectVeiculoModelo.innerHTML = '<option value="">Selecione o Modelo</option>';

    modelos.forEach((modelo) => {
      const option = document.createElement("option");
      option.value = modelo.id;
      option.textContent = modelo.nome;

      selectParamModelo.appendChild(option.cloneNode(true));
      selectVeiculoModelo.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar modelos:", error);
    Swal.fire({
      icon: 'error',
      title: 'Falha ao carregar modelos',
      text: error.message
    });
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

    if (!dadosFormulario.fkModelo || !dadosFormulario.fkHardware || !dadosFormulario.unidadeMedida) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Modelo, Hardware e Unidade de Medida devem ser preenchidos!'
      });
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarParametro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormulario),
      });

      if (resposta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Parâmetro salvo!',
          text: 'O parâmetro foi salvo com sucesso.'
        }).then(() => {
          formParametro.reset();
          atualizarUnidadesSimples();
        });
      } else {
        const erroMsg = await resposta.text();
        throw new Error(erroMsg);
      }
    } catch (error) {
      console.error("Erro ao salvar parâmetro:", error);
      Swal.fire({
        icon: 'error',
        title: 'Falha ao salvar',
        text: error.message
      });
    }
  });
}

function configurarFormularioLote() {
  const formLote = document.getElementById("loteForm");

  formLote.addEventListener("submit", async function (event) {
    event.preventDefault();

    const codigoLote = document.getElementById("lote-codigo").value;
    const dataFabricacao = document.getElementById("lote-data-fabricacao").value;
    const statusLote = document.getElementById("lote-status").value;
    const idEmpresa = sessionStorage.getItem("id_empresa_ss");

    if (!codigoLote || !dataFabricacao || !statusLote) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Todos os campos do lote são obrigatórios!'
      });
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarLote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo_lote: codigoLote,
          data_fabricacao: dataFabricacao,
          status: statusLote,
          idEmpresa: idEmpresa,
        }),
      });

      if (resposta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Lote cadastrado!',
          text: 'O lote foi cadastrado com sucesso.'
        }).then(() => {
          formLote.reset();
          window.location.reload();
        });
      } else {
        const erroMsg = await resposta.text();
        throw new Error(erroMsg);
      }
    } catch (error) {
      console.error("Erro ao cadastrar lote:", error);
      Swal.fire({
        icon: 'error',
        title: 'Falha ao cadastrar',
        text: error.message
      });
    }
  });
}

async function carregarLotesDropdown() {
  const fkEmpresa = sessionStorage.getItem("id_empresa_ss");

  try {
    const resposta = await fetch(`/cadastroVeiculos/listarLotesPorEmpresa/${fkEmpresa}`);
    if (!resposta.ok) throw new Error(await resposta.text());

    const lotes = await resposta.json();
    const selectVeiculoLote = document.getElementById("veiculo-lote");
    selectVeiculoLote.innerHTML = '<option value="">Selecione o Lote</option>';

    lotes.forEach((lote) => {
      const option = document.createElement("option");
      option.value = lote.id;
      option.textContent = lote.codigo_lote;
      selectVeiculoLote.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar lotes:", error);
    Swal.fire({
      icon: 'error',
      title: 'Falha ao carregar lotes',
      text: error.message
    });
  }
}

function configurarFormularioVeiculo() {
  const formVeiculo = document.getElementById("veiculoForm");

  formVeiculo.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dadosFormulario = {
      fkLote: document.getElementById("veiculo-lote").value,
      fkModelo: document.getElementById("veiculo-modelo").value,
      data_ativacao: document.getElementById("veiculo-data-ativacao").value,
      quantidade: document.getElementById("veiculo-quantidade").value,
    };

    if (!dadosFormulario.fkLote || !dadosFormulario.fkModelo || !dadosFormulario.data_ativacao || !dadosFormulario.quantidade) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Todos os campos são obrigatórios!'
      });
      return;
    }

    try {
      const resposta = await fetch("/cadastroVeiculos/cadastrarVeiculo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormulario),
      });

      if (resposta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Veículo(s) cadastrado(s)!',
          text: 'Os veículos foram cadastrados com sucesso.'
        }).then(() => {
          formVeiculo.reset();
        });
      } else {
        const erroMsg = await resposta.text();
        throw new Error(erroMsg);
      }
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Falha ao cadastrar',
        text: error.message
      });
    }
  });
}
