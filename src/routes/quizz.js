var express = require("express");
var router = express.Router();

var quizzController = require("../controllers/quizzController");

router.post("/inserindoResultadoQuiz", function (req, res) {
    quizzController.inserindoResultadoQuiz(req, res);
});

router.get("/listarQuestoes", function (req, res) {
    quizzController.listarQuestoes(req, res);
});

router.get("/listar", function (req, res) {
    quizzController.listarResultadoQuizz(req, res);
});

module.exports = router;