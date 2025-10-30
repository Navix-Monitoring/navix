var database = require("../database/config");

function listar(id){
    console.log("Acessei o dashboard model - listando os lotes...")

    const instrucaoSql = `SELECT 
    l.id as idLote,
    l.codigo_lote,
    l.data_fabricacao,
    l.status AS statusLote,
    m.nome AS nomeModelo,
    m.versaoPilotoAutomatico
FROM lote AS l
LEFT JOIN veiculo AS v ON v.fkLote = l.id
LEFT JOIN modelo AS m ON v.fkModelo = m.id
WHERE l.fkEmpresa = ${id};`

    console.log("Executando a instrução de listar lotes:\n"+instrucaoSql)
    return database.executar(instrucaoSql);
}

function listarModelos(){
    console.log("Acessei o dashboard model - listando os modelos...")
    const instrucaoSql = `
    SELECT * FROM modelo;
    `
    console.log("Executando a instrução de listar modelos:\n"+instrucaoSql)
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

function filtroModelo(id){
    console.log("")
    const instrucaoSql = `
    SELECT 
    l.id AS idLote,
    l.codigo_lote,
    l.data_fabricacao,
    l.status AS statusLote,
    m.id AS idModelo,
    m.nome AS nomeModelo,
    v.id AS idVeiculo
    FROM lote AS l
    INNER JOIN veiculo AS v ON v.fkLote = l.id
    INNER JOIN modelo AS m ON v.fkModelo = m.id
    WHERE m.id = ${id};
    `
    return database.executar(instrucaoSql);

}

module.exports = {
listar,
listarModelos,
buscarLote,
filtroModelo
}