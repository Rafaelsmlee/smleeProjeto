// var exploreModel = require("../models/perguntasModel");


// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nome = req.body.nomeServer;

//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");

//     } else {

      
//         perguntasModel.cadastrar(nome)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);

//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

// function pegarDadosPergunta1(req, res) {
//     perguntasModel.pegarDadosPergunta1()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send('Nenhum resultado encontrado!');
//             }
//         }).catch(function (error) {
//             console.log(error);
//             console.log(`Houve um erro ao buscar o que foi solicitado! ${error.sqlMessage}`);
//             res.status(500).json(error.sqlMessage)
//         })
// }

// function pegarDadosPergunta2(req, res) {
//     perguntasModel.pegarDadosPergunta2()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send('Nenhum resultado encontrado!');
//             }
//         }).catch(function (error) {
//             console.log(error);
//             console.log(`Houve um erro ao buscar o que foi solicitado! ${error.sqlMessage}`);
//             res.status(500).json(error.sqlMessage)
//         })
// }

// function pegarDadosPergunta3(req, res) {
//     perguntasModel.pegarDadosPergunta3()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send('Nenhum resultado encontrado!');
//             }
//         }).catch(function (error) {
//             console.log(error);
//             console.log(`Houve um erro ao buscar o que foi solicitado! ${error.sqlMessage}`);
//             res.status(500).json(error.sqlMessage)
//         })
// }

// function pegarDadosPergunta4(req, res) {
//     perguntasModel.pegarDadosPergunta4()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send('Nenhum resultado encontrado!');
//             }
//         }).catch(function (error) {
//             console.log(error);
//             console.log(`Houve um erro ao buscar o que foi solicitado! ${error.sqlMessage}`);
//             res.status(500).json(error.sqlMessage)
//         })
// }

// function pegarDadosPergunta5(req, res) {
//     perguntasModel.pegarDadosPergunta5()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send('Nenhum resultado encontrado!');
//             }
//         }).catch(function (error) {
//             console.log(error);
//             console.log(`Houve um erro ao buscar o que foi solicitado! ${error.sqlMessage}`);
//             res.status(500).json(error.sqlMessage)
//         })
// }

// module.exports = {
//     cadastrar,
//     pegarDadosPergunta1,
//     pegarDadosPergunta2,
//     pegarDadosPergunta3,
//     pegarDadosPergunta4,
//     pegarDadosPergunta5
// }

var perguntasModel = require("../models/perguntasModel");

function obterPerguntas(req, res) {
    perguntasModel.obterPerguntas()
        .then(function(resultado) {
            res.status(200).json(resultado);
        }).catch(function(error) {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

function cadastrarRespostas(req, res) {
    const { username, answers } = req.body;
    
    perguntasModel.cadastrarUsuario(username)
        .then(result => {
            const userId = result.insertId;
            const promises = answers.map(answer => {
                return perguntasModel.cadastrarResposta(userId, answer.questionId, answer.answerId);
            });

            return Promise.all(promises);
        })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

function pegarRespostas(req, res) {
    perguntasModel.pegarRespostas()
        .then(resultado => {
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
}
