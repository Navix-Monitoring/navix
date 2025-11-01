var cadastroVeiculosModel = require("../models/cadastroVeiculosModel");

function cadastrarModelo(req, res) {
  var nome = req.body.nome;
  var status = req.body.status;
  var versaoPiloto = req.body.versaoPilotoAutomatico;
  var idEmpresa = req.body.idEmpresa;

  if (!nome) {
    return res.status(400).send("O nome do modelo é obrigatório!");
  }
  if (!status) {
    return res.status(400).send("O status é obrigatório!");
  }
  if (!versaoPiloto) {
    return res.status(400).send("A versão do piloto é obrigatória!");
  }

  cadastroVeiculosModel
    .cadastrarModelo(nome, status, versaoPiloto, idEmpresa)
    .then(function (resultado) {
      res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarModelosPorEmpresa(req, res) {
  var fkEmpresa = req.params.fkEmpresa;

  if (!fkEmpresa) {
    return res.status(400).send("O fkEmpresa está indefinido!");
  }

  cadastroVeiculosModel
    .listarModelosPorEmpresa(fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar os modelos! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarParametro(req, res) {
  var fkModelo = req.body.fkModelo;
  var fkHardware = req.body.fkHardware;
  var unidadeMedida = req.body.unidadeMedida;
  var minimo = req.body.minimo;
  var neutro = req.body.neutro;
  var atencao = req.body.atencao;
  var critico = req.body.critico;

  if (!fkModelo || !fkHardware || !unidadeMedida) {
    return res
      .status(400)
      .send("Modelo, Hardware e Unidade de Medida são obrigatórios!");
  }

  cadastroVeiculosModel
    .cadastrarParametro(
      fkModelo,
      fkHardware,
      unidadeMedida,
      minimo,
      neutro,
      atencao,
      critico
    )
    .then(function (resultado) {
      res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao salvar o parâmetro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarLote(req, res) {
  var codigo_lote = req.body.codigo_lote;
  var data_fabricacao = req.body.data_fabricacao;
  var status = req.body.status;
  var idEmpresa = req.body.idEmpresa;

  if (!codigo_lote || !data_fabricacao || !status) {
    return res.status(400).send("Codigo, Data e Status são obrigatórios!");
  }

  cadastroVeiculosModel
    .cadastrarLote(codigo_lote, data_fabricacao, status, idEmpresa)
    .then(function (resultado) {
      res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao salvar o lote! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarModelo,
  listarModelosPorEmpresa,
  cadastrarParametro,
  cadastrarLote,
};
