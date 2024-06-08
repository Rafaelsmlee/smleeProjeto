// var empresaModel = require("../models/empresaModel");

// function buscarPorCnpj(req, res) {
//   var cnpj = req.query.cnpj;

//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function listar(req, res) {
//   empresaModel.listar().then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function buscarPorId(req, res) {
//   var id = req.params.id;

//   empresaModel.buscarPorId(id).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function cadastrar(req, res) {
//   var cnpj = req.body.cnpj;
//   var razaoSocial = req.body.razaoSocial;

//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     if (resultado.length > 0) {
//       res
//         .status(401)
//         .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
//     } else {
//       empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
//         res.status(201).json(resultado);
//       });
//     }
//   });
// }

// module.exports = {
//   buscarPorCnpj,
//   buscarPorId,
//   cadastrar,
//   listar,
// };

var database = require("../database/config");

function buscarRestaurantesEmpresa(idRestaurante) {
  var instrucaoSql = `SELECT * FROM restaurantes WHERE idRestaurante = ${idRestaurante}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idRestaurante, descricao) {
  var instrucaoSql = `INSERT INTO restaurantes (descricao) VALUES ('${descricao}') WHERE idRestaurante = ${idRestaurante}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarRestaurantesEmpresa,
  cadastrar
};
