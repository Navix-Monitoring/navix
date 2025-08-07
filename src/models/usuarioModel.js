var database = require("../database/config")

function autenticar(login, senha,) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", login, senha)

    var instrucaoSql = `
        SELECT id, nome, apelido, email, senha FROM users WHERE (email = '${login}' or apelido = '${login}') AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/*
function autenticar(email, senha) {
    console.log("Iniciando autenticação para:", email);

    const instrucaoSql = `
        SELECT id, nome, apelido, email, senha
        FROM users
        WHERE email = ? AND senha = ?;
    `;

    return database.executar(instrucaoSql, [email, senha]);
}
*/

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, apelido, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, apelido, email, senha);

    var instrucaoSql = `
        INSERT INTO users (nome, apelido, email, senha) VALUES ('${nome}', '${apelido}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarEmailOuApelidoExistente(email, apelido) {
    var instrucaoSql = `
        SELECT id, nome, apelido, email, senha FROM users WHERE email = '${email}' AND apelido = '${apelido}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarEmailOuApelidoExistente
};