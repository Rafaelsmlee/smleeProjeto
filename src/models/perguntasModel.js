var database = require("../database/config");

// Obtem todas as perguntas e alternativas do banco de dados.

function obterPerguntas() {
    const query = `
        SELECT p.id, p.pergunta, a.id AS alternativaId, a.resposta
        FROM perguntas p
        JOIN alternativas a ON p.id = a.fkPerguntas
        ORDER BY p.id, a.id;
    `;
    console.log("Query para obter perguntas: ", query);
    return database.executar(query);
}

// Cadastraa um novo usuário no banco de dados.

function cadastrarUsuario(nome) {
    const query = `
        INSERT INTO usuario (nome) VALUES ('${nome}');
    `;
    console.log("Query para cadastrar usuário: ", query);
    return database.executar(query);
}

//  Cadastra uma resposta escolhida pelo usuário no banco de dados.

function cadastrarResposta(userId, questionId, answerId) {
    const query = `
        INSERT INTO alternativa_escolhida (fkUsuario, fkPerguntas, fkAlternativas)
        VALUES (${userId}, ${questionId}, ${answerId});
    `;
    console.log("Query para cadastrar resposta: ", query);
    return database.executar(query);
}

// Executa a query para obter todas as respostas cadastradas no banco de dados.

function pegarRespostas() {
    const query = `
        SELECT u.nome, GROUP_CONCAT(a.resposta ORDER BY ae.fkPerguntas) AS respostas
        FROM alternativa_escolhida ae
        JOIN usuario u ON ae.fkUsuario = u.id
        JOIN alternativas a ON ae.fkAlternativas = a.id
        GROUP BY u.id, u.nome;
    `;
    console.log("Query para pegar respostas: ", query);
    return database.executar(query);
}

// Calcula a pontuação do usuário com base nas respostas cadastradas.

function calcularPontuacao(userId) {
    const query = `
        SELECT ae.fkAlternativas, p.id AS perguntaId
        FROM alternativa_escolhida ae
        JOIN perguntas p ON ae.fkPerguntas = p.id
        WHERE ae.fkUsuario = ${userId};
    `;
    return database.executar(query)
        .then(respostas => {
            let pontuacao = 0;
            respostas.forEach(resposta => {
                const { fkAlternativas, perguntaId } = resposta;
                if (perguntaId === 1) {
                    if (fkAlternativas === 1) pontuacao += 1;
                    if (fkAlternativas === 2) pontuacao += 2;
                    if (fkAlternativas === 3) pontuacao += 3;
                }
                if (perguntaId === 2) {
                    if (fkAlternativas === 4 || fkAlternativas === 5) pontuacao += 2;
                    if (fkAlternativas === 6) pontuacao += 1;
                }
                if (perguntaId === 3) {
                    if (fkAlternativas === 7) pontuacao += 1;
                    if (fkAlternativas === 8) pontuacao += 2;
                    if (fkAlternativas === 9) pontuacao += 3;
                }
                if (perguntaId === 4) {
                    if (fkAlternativas >= 10 && fkAlternativas <= 12) pontuacao += 2;
                    if (fkAlternativas === 13) pontuacao += 1;
                }
                // Pergunta 5 tem valor 0 para todas as alternativas
            });
            return pontuacao;
        });
}

module.exports = {
    obterPerguntas,
    cadastrarUsuario,
    cadastrarResposta,
    pegarRespostas,
    calcularPontuacao
};
