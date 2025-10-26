var dashboardModel = require("../models/dashboardModel");

function listar(req, res) {
    console.log("Acessei o controller listar lotes...")
    var id = req.params.idEmpresa;

    dashboardModel.listar(id).then(function (resposta) {
        res.status(200).json(resposta);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarLote(req, res) {
    console.log("Acessei o controller buscar lote...")
    var id = req.params.idLote;
    dashboardModel.buscarLote(id).then(function (resposta) {
        res.status(200).json(resposta);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listar,
    buscarLote
}