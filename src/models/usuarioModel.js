var database = require("../database/config")

function autenticarLoginEmpresa(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, emailCorporativo, senha
        FROM empresa 
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function autenticarLoginUsuario(output_email) {
    const instrucaoSql = `
        SELECT nome, email, senha
        FROM usuario 
        WHERE email = ?;
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

function deletar_conta(output_email) {
    const instrucaoSql = `
        delete from empresa
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function atualizarCampos(output_razaoSocial, output_email, senha, output_emailAntigo) {
    const instrucaoSql = `
        UPDATE empresa
        SET razaoSocial = ?, emailCorporativo = ?, senha = ?
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_email, senha, output_emailAntigo]);
}

function carregarInformacoesUsuario(email) {
    console.log("Entrou no usuarioModel");
    var instrucao = `SELECT * FROM usuario WHERE email = "${email}";`;
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
    autenticarLoginUsuario,
    cadastrar,
    verificarEmail,
    deletar_conta,
    atualizarCampos,
    carregarInformacoesUsuario,
    carregarInformacoesEmpresa
};