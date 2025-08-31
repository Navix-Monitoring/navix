var express = require("express");
var router = express.Router();
var upload = require('../utils/uploadImagem'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/register", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/authentic", function (req, res) {
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

router.post("/mudarSenha", function(req, res){
    console.log("Entrou na rota /mudarSenha");
    usuarioController.mudarSenha(req, res);
});


router.delete("/remove_register", function (req, res) {
    usuarioController.deletar(req, res);
})

router.post("/carregarInformacoes", function (req, res) {
    console.log("Entrou na rota /carregarInformacoes");
    usuarioController.carregarInformacoes(req, res);
});

module.exports = router;