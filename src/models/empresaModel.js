var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Restaurantes WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {restaurante
  var instrucaoSql = `SELECT * FROM Restaurantes`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM Restaurantes WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO Restaurantes (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
