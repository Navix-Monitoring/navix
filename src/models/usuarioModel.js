var database = require("../database/config")

function autenticarLogin(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, email, senhaHash 
        FROM empresa 
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function cadastrar(output_razaoSocial, output_cnpj, output_email, senhaHash) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, email, senhaHash) 
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_cnpj, output_email, senhaHash]);
}

function verificarEmail(output_email) {
    const instrucaoSql = `
        SELECT email 
        FROM empresa
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function deletar_conta(output_email) {
    const instrucaoSql = `
        delete empresa
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function atualizarCampos(output_razaoSocial, output_email, senhaHash, output_emailAntigo) {
    const instrucaoSql = `
        UPDATE empresa
        SET razaoSocial = ?, email = ?, senhaHash = ?
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_email, senhaHash, output_emailAntigo]);
}

module.exports = {
    autenticarLogin,
    cadastrar,
    verificarEmail,
    deletar_conta,
    atualizarCampos
};