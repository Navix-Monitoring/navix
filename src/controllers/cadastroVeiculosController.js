var cadastroVeiculosModel = require("../models/cadastroVeiculosModel");

function cadastrarModelo(req, res) {
  var nome = req.body.nome;
  var status = req.body.status;
  var versaoPiloto = req.body.versaoPilotoAutomatico;

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
    .cadastrarModelo(nome, status, versaoPiloto)
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

module.exports = {
  cadastrarModelo,
};
