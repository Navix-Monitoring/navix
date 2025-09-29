var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/buscar", function (req, res) {
  empresaController.buscarDadosEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar_empresa(req, res);
});

module.exports = router;
