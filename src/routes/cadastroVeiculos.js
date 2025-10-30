var express = require("express");
var router = express.Router();

var cadastroVeiculosController = require("../controllers/cadastroVeiculosController");

router.post("/cadastrarModelo", function (req, res) {
  cadastroVeiculosController.cadastrarModelo(req, res);
});

module.exports = router;
