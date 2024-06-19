// SELECT 
// r.idRestaurante,
// r.nome, 
// r.endereco, 
// r.cidade, 
// r.bairro, 
// r.Telefone, 
// r.WhatsApp, 
// r.Instagram,
// r. Descricao, 
// r.Ranking
// FROM Restaurantes as r
// WHERE r.idRestaurante IN (1, 2, 3);;




var database = require("../database/config");


function listarRestaurantes() {
  console.log('Estou na função listarRestaurantes do exploreModel.js!');

  var query = `
    select 
        r.idRestaurante,
        r.nome,
        r.descricao
    FROM Restaurantes as r;
    `

  console.log(`Executando a instrução SQL: \n ${query}`);
  return database.executar(query);
}

function listarMenu() {
  console.log('Estou na função listarRestaurantes do exploreModel.js!');

  var query = `
  SELECT 
    m.id, 
    m.prato, 
    m.menu_descricao, 
    m.preco
    FROM menu_itens as m
  JOIN Restaurantes as r on  m.fk_restaurante = r.idRestaurantes;
  `

  console.log(`Executando a instrução SQL: \n ${query}`);
  return database.executar(query);
}



module.exports = {
  listarRestaurantes,
  listarMenu,
}

