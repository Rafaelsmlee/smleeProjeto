// var database = require("../database/config");

// function cadastrar(nome) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome);


//     var instrucaoSql = `
//         INSERT INTO usuario (nome) VALUES ('${nome}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function pegarDadosPergunta1() {
//     console.log(`Estou no perguntasModel.js - Na função pegarDadosPergunta1() !`);

//     var query = `SELECT COUNT(altEsc.fkAlternativas) AS total_perg1, altEsc.fkAlternativas, 
// altEsc.fKPerguntas
//  FROM alternativa_escolhida AS altEsc 
//  INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
//  INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id
//  INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id
//  WHERE altEsc.fKPerguntas = 1 
//  AND altEsc.fkAlternativas IN (1, 2, 3)
//  GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
//     `;

//     console.log(`Executando a query SQL: \n ${query}`);
//     return database.executar(query);
// }

// function pegarDadosPergunta2() {
//     console.log(`Estou no perguntasModel.js - Na função pegarDadosPergunta2() !`);

//     var query = ` SELECT COUNT(altEsc.fkAlternativas) AS total_perg2, altEsc.fkAlternativas, 
//  altEsc.fKPerguntas 
//  FROM alternativa_escolhida AS altEsc 
//  INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
//  INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
//  INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
//  WHERE altEsc.fKPerguntas = 2
//  AND altEsc.fkAlternativas IN (4, 5, 6) 
//  GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
//     `;

//     console.log(`Executando a query SQL: \n ${query}`);
//     return database.executar(query);
// }

// function pegarDadosPergunta3() {
//     console.log(`Estou no perguntasModel.js - Na função pegarDadosPergunta3() !`);

//     var query = `  SELECT COUNT(altEsc.fkAlternativas) AS total_perg3, altEsc.fkAlternativas, 
//  altEsc.fKPerguntas 
//  FROM alternativa_escolhida AS altEsc 
//  INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
//  INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
//  INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
//  WHERE altEsc.fKPerguntas = 3
//  AND altEsc.fkAlternativas IN (7, 8, 9) 
//  GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
 
//     `;

//     console.log(`Executando a query SQL: \n ${query}`);
//     return database.executar(query);
// }

// function pegarDadosPergunta4() {
//     console.log(`Estou no perguntasModel.js - Na função pegarDadosPergunta4() !`);

//     var query = `   SELECT COUNT(altEsc.fkAlternativas) AS total_perg4, altEsc.fkAlternativas, 
//  altEsc.fKPerguntas 
//  FROM alternativa_escolhida AS altEsc 
//  INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
//  INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
//  INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
//  WHERE altEsc.fKPerguntas = 4
//  AND altEsc.fkAlternativas IN (10, 11, 12, 13) 
//  GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
//     `;

//     console.log(`Executando a query SQL: \n ${query}`);
//     return database.executar(query);
// }

// function pegarDadosPergunta5() {
//     console.log(`Estou no perguntasModel.js - Na função pegarDadosPergunta4() !`);

//     var query = `    SELECT COUNT(altEsc.fkAlternativas) AS total_perg5, altEsc.fkAlternativas, 
//  altEsc.fKPerguntas 
//  FROM alternativa_escolhida AS altEsc 
//  INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
//  INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
//  INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
//  WHERE altEsc.fKPerguntas = 5
//  AND altEsc.fkAlternativas IN (14, 15, 16, 17) 
//  GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
//     `;

//     console.log(`Executando a query SQL: \n ${query}`);
//     return database.executar(query);
// }


// module.exports = {
//     cadastrar,
//     pegarDadosPergunta1,
//     pegarDadosPergunta2,
//     pegarDadosPergunta3,
//     pegarDadosPergunta4,
//     pegarDadosPergunta5
// };

var database = require("../database/config");

function obterPerguntas() {
    var query = `
        SELECT q.id, q.pergunta, a.id AS alternativaId, a.resposta 
        FROM perguntas q 
        JOIN alternativas a ON q.id = a.fkPerguntas
    `;
    return database.executar(query)
        .then(resultados => {
            const perguntasMap = new Map();
            resultados.forEach(row => {
                if (!perguntasMap.has(row.id)) {
                    perguntasMap.set(row.id, { id: row.id, pergunta: row.pergunta, alternativas: [] });
                }
                perguntasMap.get(row.id).alternativas.push({ id: row.alternativaId, resposta: row.resposta });
            });
            return Array.from(perguntasMap.values());
        });
}

function cadastrarUsuario(nome) {
    var instrucaoSql = `INSERT INTO usuario (nome) VALUES ('${nome}')`;
    return database.executar(instrucaoSql);
}

function cadastrarResposta(fkUsuario, fkPerguntas, fkAlternativas) {
    var instrucaoSql = `
        INSERT INTO alternativa_escolhida (fkUsuario, fkPerguntas, fkAlternativas) 
        VALUES (${fkUsuario}, ${fkPerguntas}, ${fkAlternativas})
    `;
    return database.executar(instrucaoSql);
}

function pegarRespostas() {
    var query = `
        SELECT u.nome AS username, q.pergunta, a.resposta 
        FROM alternativa_escolhida ae 
        JOIN usuario u ON ae.fkUsuario = u.id 
        JOIN perguntas q ON ae.fkPerguntas = q.id
        JOIN alternativas a ON ae.fkAlternativas = a.id 
        ORDER BY u.nome, q.id
    `;
    return database.executar(query)
        .then(resultados => {
            const respostasMap = new Map();
            resultados.forEach(row => {
                if (!respostasMap.has(row.username)) {
                    respostasMap.set(row.username, []);
                }
                respostasMap.get(row.username).push(row.resposta);
            });
            return Array.from(respostasMap.entries()).map(([username, respostas]) => ({ username, respostas }));
        });
}

module.exports = {
    obterPerguntas,
    cadastrarUsuario,
    cadastrarResposta,
    pegarRespostas
}

