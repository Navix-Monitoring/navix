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
<<<<<<< HEAD
        INSERT INTO empresa (razaoSocial, cnpj, email, senha) 
        VALUES ("${output_razaoSocial}", "${output_cnpj}", "${output_email}", "${senhaHash}");
=======
        INSERT INTO empresa (razaoSocial, cnpj, emailCorporativo, senhaHash) 
        VALUES (?, ?, ?, ?);
>>>>>>> 79ee1f84db90287bccc3ff755825f2b69af75841
    `;

    return database.executar(instrucaoSql);
}

function verificarEmail(output_email) {
    const instrucaoSql = `
<<<<<<< HEAD
        SELECT email 
        FROM usuario
        WHERE email = "${output_email}";
=======
        SELECT emailCorporativo 
        FROM empresa
        WHERE emailCorporativo = ?;
>>>>>>> 79ee1f84db90287bccc3ff755825f2b69af75841
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