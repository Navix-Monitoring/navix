var express = require("express");
var router = express.Router();
var upload = require('../utils/uploadImagem'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/empresaController");

module.exports = router;