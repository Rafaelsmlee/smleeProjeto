var express = require("express");
var router = express.Router();

var exploreController = require("../controllers/exploreController");
var enderecoController = require("../controllers/exploreController");

router.get("/listarRestaurantes", function (req, res) {
  exploreController.listarRestaurantes(req, res);
});

router.get('/listarMenu', function (req, res) {
  comentariosController.listarMenu(req, res);
});

module.exports = router;