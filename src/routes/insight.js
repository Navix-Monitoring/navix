var express = require("express");
var router = express.Router();

var insightController = require("../controllers/insightController");

router.post("/inserir", function (req, res) {
  insightController.inserirNota(req, res);
});

router.get("/listar", function (req, res) {
  insightController.listaMediaPorPoster(req, res);
});

router.get("/poster", function (req, res) {
  insightController.atualizarPoster(req, res);
});

router.get("/buscarAvaliacoes", function (req, res) {
  insightController.buscarAvaliacoes(req, res);
});

router.get("/listandoResultadoDoQuiz", function (req, res) {
  insightController.listandoResultadoDoQuiz(req, res);
});

router.get("/listaPontuacaoDoUsuario", function (req, res) {
  insightController.listaPontuacaoDoUsuario(req, res);
});

module.exports = router;