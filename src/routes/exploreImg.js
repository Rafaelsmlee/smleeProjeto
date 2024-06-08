var express = require('express');
var router = express.Router();

var exploreImgController = require('../controllers/exploreImgController');


router.get('/buscarImagens', function (req, res) {
    comentariosController.buscarImagens(req, res);
  });


module.exports = router;