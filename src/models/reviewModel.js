var database = require("../database/config");

async function inserirReview(review) {
    var query = `
    INSERT INTO reviews (fk_restaurante, comentario, avaliacao)
    VALUES (?, ?, ?);
    `;
    var values = [review.fk_restaurante, review.comentario, review.avaliacao];

    console.log('Executando query:', query);
    console.log('Com valores:', values);

    try {
        const resultado = await database.executar(query, values);
        console.log('Resultado da inserção:', resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao executar a query de inserção:', erro);
        throw erro;
    }
}

async function listarReviews() {
    var query = `
    SELECT r.id, r.fk_restaurante, r.comentario, r.avaliacao, r.data_insercao,
           res.nome AS nome_restaurante
    FROM reviews r
    INNER JOIN restaurantes res ON r.fk_restaurante = res.idRestaurante
    ORDER BY r.data_insercao DESC;
    `;

    console.log('Executando query para listar reviews:', query);

    try {
        const resultado = await database.executar(query);
        console.log('Resultado da listagem de reviews:', resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao executar a query de listagem:', erro);
        throw erro;
    }
}

module.exports = {
    inserirReview,
    listarReviews
};
