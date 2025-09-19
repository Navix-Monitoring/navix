var database = require("../database/config")

function autenticarLoginEmpresa(output_email) {
    const instrucaoSql = `
        SELECT razaoSocial, emailCorporativo, senha, cnpj, id, caminhoImagem
        FROM empresa 
        WHERE emailCorporativo = ?;
    `;

    return database.executar(instrucaoSql, [output_email]);
}

function autenticarLoginUsuario(output_email) {
    const instrucaoSql = `
        SELECT nome, email, senha, caminhoImagem
        FROM funcionario 
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

function atualizarFotoEmpresa(nome_imagem, output_email) {
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem;
    const instrucaoSql = `
        UPDATE empresa
        SET caminhoImagem = "${caminhoImagem}"
        WHERE emailCorporativo = "${output_email}";
    `;

    return database.executar(instrucaoSql);
}

function atualizarFotoUsuario(nome_imagem, output_email) {
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem;
    const instrucaoSql = `
        UPDATE funcionario
        SET caminhoImagem = "${caminhoImagem}"
        WHERE email = "${output_email}";
    `;
    return database.executar(instrucaoSql);
}

function mudarNomeEmpresa(novoNome, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET razaoSocial = '${novoNome}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarNomeUsuario(novoNome, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE funcionario SET nome = '${novoNome}' WHERE email = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarEmailEmpresa(novoEmail, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET emailCorporativo = '${novoEmail}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarEmailUsuario(novoEmail, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE funcionario SET email = '${novoEmail}' WHERE email = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarSenhaEmpresa(novaSenha, emailUsuario){
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE empresa SET senha = '${novaSenha}' WHERE emailCorporativo = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarSenhaUsuario(novaSenha, emailUsuario){
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE funcionario SET senha = '${novaSenha}' WHERE email = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarInformacoesUsuario(email) {
    console.log("Entrou no usuarioModel");
    var instrucao = `SELECT * FROM funcionario WHERE email = "${email}";`;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarInformacoesEmpresa(email) {
    console.log("Entrou no usuarioModel");
    var instrucao = `SELECT * FROM empresa WHERE emailCorporativo = "${email}";`;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function addUserImagem(fkEmpresa, nome, sobrenome, telefone, email, senha, cargo, nome_imagem) {
    console.log("Entrou na model de criação de usuário")
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem
    var instrucaoSql = `INSERT INTO funcionario(fkEmpresa,nome,sobrenome,telefone,email,senha,cargo,caminhoImagem)
     VALUES(${fkEmpresa},"${nome}","${sobrenome}","${telefone}","${email}","${senha}","${cargo}", "${caminhoImagem}");`
    return database.executar(instrucaoSql)

}

function addUser(fkEmpresa, nome, sobrenome, telefone, email, senha, cargo) {
    console.log("Entrou na model de criação de usuário")
    var instrucaoSql = `INSERT INTO funcionario(fkEmpresa,nome,sobrenome,telefone,email,senha,cargo) VALUES(${fkEmpresa},"${nome}","${sobrenome}","${telefone}","${email}","${senha}","${cargo}");`
    return database.executar(instrucaoSql)

}

function getUsersByCompanyId(idEmpresa) {
    const instrucaoSql = `SELECT * FROM funcionario WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

function deleteUser(id) {
    const instrucaoSql = `DELETE FROM funcionario WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

function updateUser(nome, sobrenome, email, telefone, cargo, id) {
    const instrucaoSql = `UPDATE funcionario SET nome = "${nome}", sobrenome = "${sobrenome}", telefone = "${telefone}", email = "${email}", cargo = "${cargo}" where id = ${id}`
    return database.executar(instrucaoSql)
}

function updateUserImagem(nome, sobrenome, email, telefone, cargo, id, nome_imagem) {
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem
    const instrucaoSql = `UPDATE funcionario SET nome = "${nome}", sobrenome = "${sobrenome}",
     telefone = "${telefone}", email = "${email}", cargo = "${cargo}", caminhoImagem = "${caminhoImagem}" where id = ${id}`
    return database.executar(instrucaoSql)
}


module.exports = {
    autenticarLoginEmpresa,
    autenticarLoginUsuario,
    cadastrar,
    verificarEmail,
    deletar_conta,
    mudarNomeEmpresa,
    mudarNomeUsuario,
    atualizarFotoEmpresa,
    atualizarFotoUsuario,
    mudarEmailEmpresa,
    mudarEmailUsuario,
    mudarSenhaEmpresa,
    mudarSenhaUsuario,
    carregarInformacoesUsuario,
    carregarInformacoesEmpresa,
    deleteUser,
    getUsersByCompanyId,
    addUserImagem,
    addUser,
    updateUserImagem,
    updateUser
};