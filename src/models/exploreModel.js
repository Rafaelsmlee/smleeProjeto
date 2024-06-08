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

function listarEndereco() {
  console.log('Estou na função listarEndereco do exploreModel.js!');

  var query = `
  SELECT 
    r.idRestaurante,
    r.nome,
    GROUP_CONCAT(DISTINCT hf.dias_funcionamento ORDER BY FIELD(hf.dias_funcionamento, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')) AS dias_funcionamento,
    r.WhatsApp,
    CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo
FROM 
    Restaurantes AS r
JOIN 
    horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
LEFT JOIN (
    SELECT 'Segunda' AS dia_semana UNION
    SELECT 'Terça' UNION
    SELECT 'Quarta' UNION
    SELECT 'Quinta' UNION
    SELECT 'Sexta' UNION
    SELECT 'Sábado' UNION
    SELECT 'Domingo'
) AS d ON d.dia_semana NOT IN (
    SELECT hf_inner.dias_funcionamento
    FROM horario_funcionamento hf_inner
    WHERE hf_inner.fk_restaurante = r.idRestaurante
)
GROUP BY 
    r.idRestaurante, r.nome, r.WhatsApp, endereco_completo
ORDER BY 
    r.nome;
    
    
  `

  console.log(`Executando a instrução SQL: \n ${query}`);
  return database.executar(query);
}



module.exports = {
  listarRestaurantes,
  listarMenu,
  listarEndereco
}

