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
  numero
) {
  console.log("ACESSEI O EMPRESA MODEL - Iniciando cadastro...");

  const instrucaoEndereco = `INSERT INTO endereco (rua, numero, cep, bairro, cidade, estado, pais) VALUES ('${rua}', '${numero}', '${cep}', '${bairro}', '${cidade}', '${estado}', '${pais}');`;
  console.log("Executando SQL para endereco: \n" + instrucaoEndereco);

  return database
    .executar(instrucaoEndereco)
    .then(function (resultadoEndereco) {
      const idEndereco = resultadoEndereco.insertId;
      console.log("ID do Estado inserido:", idEndereco);

      const instrucaoEmpresa = `INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao, fkEndereco) VALUES ('${razaoSocial}', '${cnpj}', '${codigo_ativacao}', '${idEndereco}');`;
      console.log("Executando SQL para Empresa: \n" + instrucaoEmpresa);

      return database.executar(instrucaoEmpresa);
    });
}

module.exports = {
  buscarDadosEmpresa,
  cadastrar_empresa,
};