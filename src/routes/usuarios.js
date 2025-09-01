var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/register", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/authentic", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/update_register", function (req, res) {
    usuarioController.atualizar(req, res);
})

router.delete("/remove_register", function (req, res) {
    usuarioController.deletar(req, res);
})

router.post("/carregarInformacoes", function (req, res) {
    console.log("Entrou na rota /carregarInformacoes");
    usuarioController.carregarInformacoes(req, res);
});

router.delete("/deleteUser/:id",function(req, res){
    console.log("Passou na rota /deleteUser");
    usuarioController.deleteUser(req, res);
});

router.post("/addUser", function(req, res){
    console.log("Passou pela rota /addUser")
    usuarioController.addUser(req, res)
})

router.post("/updateUser", function(req, res){
    console.log("Passou aqui na rota /updateUser")
    usuarioController.updateUser(req,res)
})

router.get("/getUsersByCompanyId/:id", function(req, res){
    console.log("Passou na rota /getUserByCompanyId")
    usuarioController.getUsersByCompanyId(req,res)
})
module.exports = router;