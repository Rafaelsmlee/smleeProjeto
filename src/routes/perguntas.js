var express = require("express");
var router = express.Router();

var perguntasController = require("../controllers/perguntasController");

router.get("/perguntas", function(req, res) {
    perguntasController.obterPerguntas(req, res);
});

router.post("/cadastrarRespostas", function(req, res) {
    perguntasController.cadastrarRespostas(req, res);
});

router.get("/pegarRespostas", function(req, res) {
    perguntasController.pegarRespostas(req, res);
});

module.exports = router;
