var database = require("../database/config")

function verificarLogin(loginEmail) {
    const instrucaoSql = `
        SELECT id, nome, email, senhaHash 
        FROM users 
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [loginEmail]);
}

function cadastrar(output_razaoSocial, output_cnpj, output_email, senhaHash) {
    const instrucaoSql = `
        INSERT INTO users (nome, email, senhaHash) 
        VALUES (?, ?, ?);
    `;

    return database.executar(instrucaoSql, [output_razaoSocial, output_cnpj, output_email, senhaHash]);
}

function verificarEmail_CNPJ(output_email, output_cnpj) {
    const instrucaoSql = `
        SELECT email 
        FROM users 
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [output_email, output_cnpj]);
}

module.exports = {
    verificarLogin,
    cadastrar,
    verificarEmail_CNPJ
};