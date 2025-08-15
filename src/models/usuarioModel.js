var database = require("../database/config")

function verificarLogin(loginEmail) {
    const instrucaoSql = `
        SELECT id, nome, email, senhaHash 
        FROM users 
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [loginEmail]);
}

function cadastrar(nome, email, senhaHash) {
    const instrucaoSql = `
        INSERT INTO users (nome, email, senhaHash) 
        VALUES (?, ?, ?);
    `;

    return database.executar(instrucaoSql, [nome, email, senhaHash]);
}

function verificarEmail(email) {
    const instrucaoSql = `
        SELECT email 
        FROM users 
        WHERE email = ?;
    `;

    return database.executar(instrucaoSql, [email]);
}

module.exports = {
    verificarLogin,
    cadastrar,
    verificarEmail
};