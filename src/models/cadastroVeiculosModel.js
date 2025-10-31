var database = require("../database/config");

function cadastrarModelo(nome, status, versaoPiloto, idEmpresa) {
  console.log(
    "Acessando o MODEL para cadastrar modelo: ",
    nome,
    status,
    versaoPiloto,
    idEmpresa
  );

  var instrucaoSql = `
        INSERT INTO modelo (nome, versaoPilotoAutomatico, status, fkEmpresa) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        status = VALUES(status);
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql, [
    nome,
    versaoPiloto,
    status,
    idEmpresa,
  ]);
}

function listarModelosPorEmpresa(fkEmpresa) {
  var instrucaoSql = `
        SELECT id, nome FROM modelo WHERE fkEmpresa = ?;
    `;
  return database.executar(instrucaoSql, [fkEmpresa]);
}

function cadastrarParametro(
  fkModelo,
  fkHardware,
  unidadeMedida,
  minimo,
  neutro,
  atencao,
  critico
) {
  var instrucaoSql = `
        INSERT INTO parametroHardware 
            (fkModelo, fkHardware, unidadeMedida, parametroMinimo, parametroNeutro, parametroAtencao, parametroCritico)
        VALUES 
            (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            unidadeMedida = VALUES(unidadeMedida),
            parametroMinimo = VALUES(parametroMinimo),
            parametroNeutro = VALUES(parametroNeutro),
            parametroAtencao = VALUES(parametroAtencao),
            parametroCritico = VALUES(parametroCritico);
    `;

  return database.executar(instrucaoSql, [
    fkModelo,
    fkHardware,
    unidadeMedida,
    minimo,
    neutro,
    atencao,
    critico,
  ]);
}

function cadastrarLote(codigo_lote, data_fabricacao, status, idEmpresa) {
  console.log(
    "Acessando o MODEL para cadastrar modelo: ",
    codigo_lote,
    data_fabricacao,
    idEmpresa,
    status
  );

  var instrucaoSql = `
        INSERT INTO lote 
            (codigo_lote, data_fabricacao, status, fkEmpresa) 
        VALUES 
            (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            data_fabricacao = VALUES(data_fabricacao),
            status = VALUES(status);
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql, [
    codigo_lote,
    data_fabricacao,
    status,
    idEmpresa,
  ]);
}

module.exports = {
  cadastrarModelo,
  listarModelosPorEmpresa,
  cadastrarParametro,
  cadastrarLote,
};
