var database = require("../database/config");

function listar(id){
    console.log("Acessei o dashboard model - listando os lotes...")

    const instrucaoSql = `SELECT * FROM lote WHERE fkEmpresa = ${id}`

    console.log("Executando a instrução de listar lotes:\n"+instrucaoSql)
    return database.executar(instrucaoSql);
}

function buscarLote(id){
    console.log("Acessei o  dashboard model - buscando o lote...")

    const instrucaoSql=`
    SELECT v.*, l.*, 
       (SELECT COUNT(*) 
        FROM veiculo 
        WHERE fkLote = l.id) AS qtd_veiculos
    FROM veiculo v
    INNER JOIN lote l ON v.fkLote = l.id
    WHERE l.id = ${id};`
    return database.executar(instrucaoSql);
}

module.exports = {
listar,
buscarLote
}