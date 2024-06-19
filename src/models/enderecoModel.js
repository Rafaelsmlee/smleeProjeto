var database = require("../database/config");

function listarEndereco() {
  console.log('Estou na função listarEndereco do enderecoModel.js!');

  var query = `
  SELECT 
    r.idRestaurante,
    r.nome,
    r.WhatsApp,
    CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo,
    MIN(hf.dias_funcionamento) AS primeiro_dia,
    MAX(hf.dias_funcionamento) AS ultimo_dia,
    TIME_FORMAT(MIN(hf.horario_abertura), '%H:%i') AS horario_abertura,
    TIME_FORMAT(MAX(hf.horario_fechamento), '%H:%i') AS horario_fechamento
FROM 
    Restaurantes AS r
JOIN 
    horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
GROUP BY 
    r.idRestaurante, r.nome, r.WhatsApp, endereco_completo
ORDER BY 
    r.nome;
  `

  console.log(`Executando a instrução SQL: \n ${query}`);
  return database.executar(query);
}

module.exports = {
  listarEndereco
}
