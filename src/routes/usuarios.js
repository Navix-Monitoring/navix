var express = require("express");
var router = express.Router();
var upload = require('../utils/uploadImagem'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

router.post("/autenticarStatus", function(req,res){
    usuarioController.autenticarStatus(req,res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/register", function (req, res) {
    usuarioController.cadastrarAdm(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/atualizarFoto", upload.single('foto'), function (req, res) {
    usuarioController.atualizar(req, res);
})

router.post("/mudarNome", function(req, res){
    console.log("Entrou na rota /mudarNome");
    usuarioController.mudarNome(req, res);
});

router.post("/mudarEmail", function(req, res){
    console.log("Entrou na rota /mudarEmail");
    usuarioController.mudarEmail(req, res);
});

router.post("/mudarStatus", function(req, res){
    usuarioController.mudarStatus(req, res);
});

router.post("/mudarSenha", function(req, res){
    console.log("Entrou na rota /mudarSenha");
    usuarioController.mudarSenha(req, res);
});


router.delete("/remove_register", function (req, res) {
    usuarioController.deletar(req, res);
});


router.post("/carregarInformacoes", function (req, res) {
    console.log("Entrou na rota /carregarInformacoes");
    usuarioController.carregarInformacoes(req, res);
});

router.delete("/deletarUsuario/:id",function(req, res){
    console.log("Passou na rota /deletarUsuario");
    usuarioController.deletarUsuario(req, res);
});

router.post("/cadastrarUsuario", upload.single('foto'), function(req, res){
    console.log("Passou pela rota /cadastrarUsuario")
    usuarioController.cadastrarUsuario(req, res)
})

router.post("/atualizarUsuario", upload.single('fotoAtualizar'), function(req, res){
    console.log("Passou aqui na rota /atualizarUsuario")
    usuarioController.atualizarUsuario(req,res)
})

router.get("/listarUsuariosEmpresa/:id", function(req, res){
    console.log("Passou na rota /getUserByCompanyId")
    usuarioController.listarUsuariosEmpresa(req,res)
})
module.exports = router;