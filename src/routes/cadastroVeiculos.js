var express = require("express");
var router = express.Router();

var cadastroVeiculosController = require("../controllers/cadastroVeiculosController");

router.post("/cadastrarModelo", function (req, res) {
  cadastroVeiculosController.cadastrarModelo(req, res);
});

router.get("/listarModelosPorEmpresa/:fkEmpresa", function (req, res) {
  cadastroVeiculosController.listarModelosPorEmpresa(req, res);
});

router.post("/cadastrarParametro", function (req, res) {
  cadastroVeiculosController.cadastrarParametro(req, res);
});

module.exports = router;
