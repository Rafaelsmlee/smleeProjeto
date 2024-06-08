var express = require("express");
var router = express.Router();

var reviewController = require("../../controllers/formController");

router.post("/cadastrarResposta", function (req, res) {
    reviewController.cadastrarResposta(req, res);
});

module.exports = router;
