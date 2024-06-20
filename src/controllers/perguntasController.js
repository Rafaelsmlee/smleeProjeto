var perguntasModel = require("../models/perguntasModel");

//  Obtém todas as perguntas e alternativas do banco de dados e as envia na resposta.

function obterPerguntas(req, res) {
    perguntasModel.obterPerguntas()
        .then(function(resultado) {
            console.log("Perguntas obtidas: ", resultado);
            res.status(200).json(resultado);
        }).catch(function(error) {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

// Recebe as respostas do usuário, cadastra as respostas e calcula a recomendação de restaurante com base na pontuação.
function cadastrarRespostas(req, res) {
    const { username, answers } = req.body;
    console.log("Dados recebidos para cadastro de respostas: ", { username, answers });

    perguntasModel.cadastrarUsuario(username)
        .then(result => {
            const userId = result.insertId;
            console.log("Usuário cadastrado com ID: ", userId);
            const promises = answers.map(answer => {
                return perguntasModel.cadastrarResposta(userId, answer.questionId, answer.answerId);
            });

            return Promise.all(promises).then(() => userId);
        })
        .then(userId => perguntasModel.calcularPontuacao(userId))
        .then(pontuacao => {
            let recomendacao = '';
            if (pontuacao < 5) {
                recomendacao = 'Pollo Loko';
            } else if (pontuacao >= 5 && pontuacao <= 8) {
                recomendacao = 'Seoul Chicken';
            } else {
                recomendacao = 'Waker Chicken';
            }
            res.status(200).json({ success: true, recomendacao });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

// Obtém todas as respostas cadastradas no banco de dados e as envia na resposta.

function pegarRespostas(req, res) {
    perguntasModel.pegarRespostas()
        .then(resultado => {
            console.log("Respostas obtidas: ", resultado);
            resultado.forEach(post => {
                console.log(`Nome: ${post.nome}, Respostas: ${post.respostas}`);
            });
            res.status(200).json(resultado);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    obterPerguntas,
    cadastrarRespostas,
    pegarRespostas
};
