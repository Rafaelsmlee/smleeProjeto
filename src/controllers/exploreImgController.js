var exploreImgModel = require("../models/exploreImgModel");


function buscarImagens(req, res) {
    console.log(`ESTOU NO exploreImgModel.js | Na função buscarImagens!`);
    exploreImgModel.buscarImagens()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log(`Erro ao realizar a query, mensagem do erro: ${erro.sqlMessage}`);
            res.status(500).json(erro.sqlMessage);
        }
        );

}


module.exports = {
    buscarImagens
}; 