var database = require("../database/config");


  function buscarImagens() {
    console.log('Estou na função buscarImagens do exploreModel.js!');

    var query = `
    SELECT
		r.idRestaurante,
        r.nome,
		img.imagem
	FROM ImagensRestaurante AS img
	JOIN Restaurantes AS r ON   r.idRestaurante = img.fk_restaurante
    WHERE r.idRestaurante IN (1,2,3 );
    `

    console.log(`Executando a instrução SQL: \n ${query}`);
    return database.executar(query);
}


module.exports = {
    buscarImagens
}

