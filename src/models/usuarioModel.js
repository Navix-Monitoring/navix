var database = require("../database/config")

function autenticarLogin(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, emailCorporativo, senhaHash
        FROM empresa 
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function cadastrar(output_razaoSocial, output_cnpj, output_email, senhaHash) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, emailCorporativo, senhaHash) 
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_cnpj, output_email, senhaHash]);
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

function atualizarCampos(output_razaoSocial, output_email, senhaHash, output_emailAntigo) {
    const instrucaoSql = `
        UPDATE empresa
        SET razaoSocial = ?, emailCorporativo = ?, senha = ?
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_email, senhaHash, output_emailAntigo]);
}

function carregarInformacoes(idUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        SELECT * FROM usuario WHERE id_usuario = ${idUsuario};
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    autenticarLogin,
    cadastrar,
    verificarEmail,
    deletar_conta,
    atualizarCampos,
    carregarInformacoes
};