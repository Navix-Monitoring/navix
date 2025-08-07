var database = require("../database/config");

function inserirNotaPessoal(fkuser, fkfilmes_series, nota,) { // avaliação de filmes pelo user
  var instrucaoSql = `
    INSERT INTO insight (fkuser, fkfilmes_series, nota)
    VALUES (${fkuser}, ${fkfilmes_series}, ${nota});
  `;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarMediaPoster(posterId) {
  var instrucaoSql = `
  SELECT ROUND(AVG(nota), 1) AS media FROM insight WHERE fkfilmes_series = ${posterId};
  `;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function verificarPosterListar(idUsuario, posterId) {
  var instrucaoSql = `
  SELECT fkuser, fkfilmes_series FROM insight where fkuser = ${idUsuario} AND fkfilmes_series = ${posterId}`;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMediaEmTodosOsPoster() {
  var instrucaoSql = `
  SELECT fkfilmes_series AS posterId, ROUND(AVG(nota), 1) AS media FROM insight GROUP BY fkfilmes_series;
  `
  
  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAvaliacoes() {
  var instrucaoSql = `
  SELECT fil.titulo as poster, ROUND(AVG(ins.nota), 1) as media, COUNT(users.id) as users from insight ins
  INNER join filmes_series fil on fil.id = ins.fkfilmes_series
  INNER JOIN users on users.id =  ins.fkuser
  GROUP BY fil.titulo;
  `;
  
  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function listandoResultadoDoQuiz(idUsuario) {
  var instrucaoSql = `
  select 
	fr.pontuacao_total as pontuacaoTotal,
    fr.dataFinalizacao as dataRealizacaoQuiz,
    fd.analise as analise,
    fd.classe as classe
    from ficha_resultado fr
    inner join feedback fd 
    on fr.fkfeedback = fd.id where fr.fkuser = ${idUsuario};
  `;


  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function listaPontuacaoDoUsuario(idUsuario) {
  var instrucaoSql = `
  select pontuacao from ficha_tecnica where fkuser = ${idUsuario};
  `;
  
  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  inserirNotaPessoal,
  listarMediaPoster,
  verificarPosterListar,
  buscarMediaEmTodosOsPoster,
  buscarAvaliacoes,
  listandoResultadoDoQuiz,
  listaPontuacaoDoUsuario
}
