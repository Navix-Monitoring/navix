var database = require("../database/config")

function autenticarLogin(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, emailCorporativo, senhaHash, id_empresa
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

function carregarInformacoesUsuario(email) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        SELECT * FROM usuario WHERE email = ${email};
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

function addUser(fkEmpresa, nome, sobrenome, telefone, email, senha, cargo) {
    console.log("Entrou na model de criação de usuário")
    var instrucaoSql = `INSERT INTO usuario(fkEmpresa,nome,sobrenome,telefone,email,senha,cargo) VALUES(${fkEmpresa},"${nome}","${sobrenome}","${telefone}","${email}","${senha}","${cargo}");`
    return database.executar(instrucaoSql)

}

function getUsersByCompanyId(idEmpresa) {
    const instrucaoSql = `SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

function deleteUser(id) {
    const instrucaoSql = `DELETE FROM usuario WHERE id_usuario = ${id}`
    return database.executar(instrucaoSql)
}

function updateUser(nome, sobrenome, email, telefone, cargo, id) {
    const instrucaoSql = `UPDATE usuario SET nome = "${nome}", sobrenome = "${sobrenome}", telefone = "${telefone}", email = "${email}", cargo = "${cargo}" where id_usuario = ${id}`
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticarLogin,
    cadastrar,
    verificarEmail,
    deletar_conta,
    atualizarCampos,
    carregarInformacoesUsuario,
    carregarInformacoesEmpresa,
    deleteUser,
    getUsersByCompanyId,
    addUser,
    updateUser
};