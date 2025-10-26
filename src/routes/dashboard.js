var express = require("express");
var router = express.Router();

var dashboardControlller = require("../controllers/dashboardController");

router.get("/listar/:idEmpresa", function (req, res) {
  dashboardControlller.listar(req, res);
});

router.get("/buscarLote/:idLote",function(req,res){
  dashboardControlller.buscarLote(req,res);
});

module.exports = router;
