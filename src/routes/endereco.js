var express = require("express");
var router = express.Router();
var enderecoController = require("../controllers/enderecoController");

router.get("/listarEndereco", function (req, res) {
    enderecoController.listarEndereco(req, res);
});

module.exports = router;
