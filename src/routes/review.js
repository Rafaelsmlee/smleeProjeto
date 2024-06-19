var express = require("express");
var router = express.Router();
var reviewController = require("../controllers/reviewController");

router.post("/adicionarReview", reviewController.adicionarReview);
router.get("/listarReviews", reviewController.listarReviews);

module.exports = router;
