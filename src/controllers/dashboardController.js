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

function listarModelos(req,res){
    console.log("Acessei o controller listar modelos...")

    dashboardModel.listarModelos().then(function(resposta){
        res.status(200).json(resposta);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarLoteparaEditar(req, res) {
    console.log("Acessei o controller buscar lote para editar...")
    var id = req.params.idLote;
    dashboardModel.buscarLoteparaEditar(id).then(function (resposta) {
        res.status(200).json(resposta);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
function editarLote(req,res){
    console.log("Acessei o controller editar lote...")
    var codigo_lote = req.body.
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

function filtroModelo(req,res){
var id = req.params.idModelo;
dashboardModel.filtroModelo(id).then(function(resposta){
    res.status(200).json(resposta);
}).catch(function(erro){
    res.status(500).json(erro.sqlMessage);
})
}

module.exports = {
    listar,
    listarModelos,
    buscarLote,
    filtroModelo,
    buscarLoteparaEditar,
    editarLote
}