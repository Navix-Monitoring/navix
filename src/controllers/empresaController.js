var empresaModel = require("../models/empresaModel");

function buscarDadosEmpresa(req, res) {
  empresaModel.buscarDadosEmpresa().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar_empresa(req, res) {
  var razaoSocial = req.body.razaoSocialServer;
  var cnpj = req.body.cnpjServer;
  var codigo_ativacao = req.body.codigoServer;
  var cep = req.body.cepServer;
  var estado = req.body.estadoServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var rua = req.body.ruaServer;
  var numero = req.body.numeroServer;
  var pais = "Brasil"

  // if (razaoSocial == undefined) {
  //   res.status(400).send("Nome empresa está undefined!");
  // } else if (cnpj == undefined) {
  //   res.status(400).send("CNPJ está undefined!");
  // } else if (codigo_ativacao == undefined) {
  //   res.status(400).send("Codigo está undefined!");
  // } else if (cep == undefined) {
  //   res.status(400).send("CEP está undefined!");
  // } else if (estado == undefined) {
  //   res.status(400).send("Estado está undefined!");
  // } else if (cidade == undefined) {
  //   res.status(400).send("Cidade está undefined!");
  // } else if (bairro == undefined) {
  //    res.status(400).send("Bairro está undefined!");
  // } else if (rua == undefined) {
  //   res.status(400).send("Rua está undefined!");
  // } else if (numero == undefined) {
  //   res.status(400).send("Numero está undefined!");
  // } else {
    empresaModel.cadastrar_empresa(razaoSocial, cnpj, codigo_ativacao, cep, estado, cidade, bairro, rua, numero,pais)
      .then(function (resultado) {
        res.json(resultado);
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

function listarCargos(req,res){
  console.log("Acessei o controller listar cargos...")
  empresaModel.listarCargos().then(function(resposta){
    res.status(200).json(resposta);
  }).catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  })
}

module.exports = {
  listarCargos,
  buscarDadosEmpresa,
  cadastrar_empresa,
};