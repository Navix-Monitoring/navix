var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/register", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/authentic", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/update_register", function (req, res) {
    usuarioController.atualizar(req, res);
})

router.delete("/remove_register", function (req, res) {
    usuarioController.deletar(req, res);
})

module.exports = router;