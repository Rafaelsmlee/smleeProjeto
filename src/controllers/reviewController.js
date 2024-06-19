var reviewModel = require("../models/reviewModel");

async function adicionarReview(req, res) {
    try {
        var review = {
            fk_restaurante: req.body.fk_restaurante,
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao
        };

        console.log('Recebido review para adicionar:', review);

        if (!review.fk_restaurante || !review.comentario || !review.avaliacao) {
            console.error("Campos obrigatórios faltando.");
            return res.status(400).send("Campos obrigatórios faltando.");
        }

        const resultado = await reviewModel.inserirReview(review);
        console.log('Review adicionado com sucesso:', resultado);
        res.status(201).send("Review adicionado com sucesso!");
    } catch (erro) {
        console.error("Erro ao adicionar review:", erro);
        res.status(500).send("Erro ao adicionar review: " + erro.message);
    }
}

async function listarReviews(req, res) {
    try {
        const reviews = await reviewModel.listarReviews();
        console.log('Reviews listados com sucesso:', reviews);
        res.status(200).json(reviews);
    } catch (erro) {
        console.error("Erro ao listar reviews:", erro);
        res.status(500).send("Erro ao listar reviews: " + erro.message);
    }
}

module.exports = {
    adicionarReview,
    listarReviews
};
