var database = require("../database/config");

function cadastrarModelo(nome, status, versaoPiloto) {
  console.log(
    "Acessando o MODEL para cadastrar modelo: ",
    nome,
    status,
    versaoPiloto
  );

  var instrucaoSql = `
        INSERT INTO modelo (nome, versaoPilotoAutomatico, status) VALUES (?, ?, ?);
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql, [nome, versaoPiloto, status]);
}

module.exports = {
  cadastrarModelo,
};
