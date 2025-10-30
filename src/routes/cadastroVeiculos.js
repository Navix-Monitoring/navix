var express = require("express");
var router = express.Router();

var cadastroVeiculosController = require("../controllers/cadastroVeiculosController");

router.post("/cadastrar", function (req, res) {
  cadastroVeiculosController.cadastrar_veiculo(req, res);
});

module.exports = router;