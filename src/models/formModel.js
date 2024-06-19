var express = require("express");
var router = express.Router();

var formController = require("../controllers/formController");


router.post("/cadastrarResposta", function (req, res) {
    formController.cadastrarResposta(req, res);
});

module.exports = router


