var database = require("../database/config");

function buscarDadosEmpresa() {
  var instrucaoSql = `SELECT id as IdEmpresa, nome as razaoSocialEmpresa, codigo_ativacao as Codigo FROM empresa;`;

  return database.executar(instrucaoSql);
}

async function cadastrar_empresa(
  razaoSocial,
  cnpj,
  codigo_ativacao,
  cep,
  estado,
  cidade,
  bairro,
  rua,
  numero,
  pais
) {
  console.log("ACESSEI O EMPRESA MODEL - Iniciando cadastro...");

  const instrucaoEmpresa = `INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao) VALUES ('${razaoSocial}', '${cnpj}', '${codigo_ativacao}');`;
      console.log("Executando SQL para Empresa: \n" + instrucaoEmpresa);

  
  return database
    .executar(instrucaoEmpresa)
    .then(function (resultadoEmpresa) {
      const idEmpresa = resultadoEmpresa.insertId;
      console.log("ID da empresa inserido:", resultadoEmpresa);

      const instrucaoEndereco = `INSERT INTO endereco (fkEmpresa,rua, numero, cep, bairro, cidade, estado, pais) VALUES (${idEmpresa},'${rua}', '${numero}', '${cep}', '${bairro}', '${cidade}', '${estado}', '${pais}');`;
      console.log("Executando SQL para endereco: \n" + instrucaoEndereco);

      return database.executar(instrucaoEndereco);
    });
}

function listarCargos() {
  console.log("ACESSEI O EMPRESA MODEL - listando cargos...");
  const instrucaoSql =
    `
      SELECT * FROM cargo;
    `
  console.log("Executando SQL para Empresa: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDadosEmpresa,
  cadastrar_empresa,
  listarCargos
};