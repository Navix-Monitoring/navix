var database = require("../database/config")

function autenticarLoginEmpresa(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, emailCorporativo, senha, cnpj, id, caminhoImagem
        FROM empresa 
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function cadastrar(output_razaoSocial, output_cnpj, output_email, senha) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, emailCorporativo, senha) 
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_cnpj, output_email, senha]);
}

function verificarEmail(output_email) {
    const instrucaoSql = `
        SELECT emailCorporativo 
        FROM empresa
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function deletarEmpresa(output_email) {
    const instrucaoSql = `
        delete from empresa
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function atualizarFotoEmpresa(nome_imagem, output_email) {
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem;
    const instrucaoSql = `
        UPDATE empresa
        SET caminhoImagem = "${caminhoImagem}"
        WHERE emailCorporativo = "${output_email}";
    `;

    return database.executar(instrucaoSql);
}

function atualizarNomeEmpresa(novoNome, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET razaoSocial = '${novoNome}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmailEmpresa(novoEmail, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET emailCorporativo = '${novoEmail}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSenhaEmpresa(novaSenha, emailUsuario){
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET senha = '${novaSenha}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarInformacoesEmpresa(email) {
    console.log("Entrou no usuarioModel");
    var instrucao = `SELECT * FROM empresa WHERE emailCorporativo = "${email}";`;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
  autenticarLoginEmpresa,
  cadastrar,
  verificarEmail,
  deletarEmpresa,
  atualizarFotoEmpresa,
  atualizarNomeEmpresa,
  atualizarEmailEmpresa,
  atualizarSenhaEmpresa,
  carregarInformacoesEmpresa
};