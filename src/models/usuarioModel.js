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
        INSERT INTO empresa (razaoSocial, cnpj, email, senha) 
        VALUES ("${output_razaoSocial}", "${output_cnpj}", "${output_email}", "${senhaHash}");
    `;

    return database.executar(instrucaoSql);
}

function verificarEmail(output_email) {
    const instrucaoSql = `
        SELECT email 
        FROM usuario
        WHERE email = "${output_email}";
    `;

    return database.executar(instrucaoSql);
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
        SET razaoSocial = ?, emailCorporativo = ?, senhaHash = ?
        WHERE emailCorporativo = ?;
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