// var express = require("express");
// var router = express.Router();

// var perguntasController = require("../controllers/perguntasController");

// router.post("/cadastrar", function (req, res) {
//     perguntasController.cadastrar(req, res);
// });

// router.get("/pegarDadosPergunta1", function(req, res) {
//     perguntasController.pegarDadosPergunta1(req, res);
// });

// router.get("/pegarDadosPergunta2", function(req, res) {
//     perguntasController.pegarDadosPergunta2(req, res);
// });

// router.get("/pegarDadosPergunta3", function(req, res) {
//     perguntasController.pegarDadosPergunta3(req, res);
// });

// router.get("/pegarDadosPergunta4", function(req, res) {
//     perguntasController.pegarDadosPergunta4(req, res);
// });

// router.get("/pegarDadosPergunta5", function(req, res) {
//     perguntasController.pegarDadosPergunta5(req, res);
// });

// module.exports = router;

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

