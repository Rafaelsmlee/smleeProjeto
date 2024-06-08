var formModel = require("../../models/formModel");

function cadastrarResposta(req, res) {
    var dadosForm = req.body.dadosFormJSON;

    for (let resposta of Object.keys(dadosForm)) {

        if (dadosForm[resposta] == undefined) {
            res.status(400).send(`A resposta ${resposta} está indefinida!`)
            return false
        }
    }

    formModel.cadastrarResposta(dadosForm)
    .then(function (response) {
        res.json(response)

    }).catch(function (error) {
        console.log(error);
        console.log(`\nHouve um erro ao realizar o envio do formulário! Erro: ${error.sqlMessage}`);
    })

}

module.exports = {
    cadastrarResposta
}

