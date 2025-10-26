var database = require("../database/config")

function autenticar(email, senha) {
    const instrucaoSql = `
        SELECT func.nome, func.email, func.senha, func.caminhoImagem, func.fkCargo, c.titulo, emp.codigo_ativacao, func.fkEmpresa
        FROM funcionario func 
        INNER JOIN empresa emp ON emp.id = func.fkEmpresa
        INNER JOIN cargo c ON c.id = func.fkCargo
        WHERE func.email = '${email}' AND func.senha = '${senha}'
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

function atualizarNomeUsuario(novoNome, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE funcionario SET nome = '${novoNome}' WHERE email = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmailUsuario(novoEmail, emailUsuario) {
    console.log("Entrou no usuarioModel");
    var instrucao = `
        UPDATE funcionario SET email = '${novoEmail}' WHERE email = "${emailUsuario}";
    `;
    console.log("Executando a query: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSenhaUsuario(novaSenha, emailUsuario) {
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

function adicionarFotoUsuario(fkEmpresa, nome, sobrenome, telefone, email, senha, cargo, nome_imagem) {
    console.log("Entrou na model de criação de usuário")
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem
    var instrucaoSql = `INSERT INTO funcionario(fkEmpresa,nome,sobrenome,telefone,email,senha,cargo,caminhoImagem)
     VALUES(${fkEmpresa},"${nome}","${sobrenome}","${telefone}","${email}","${senha}","${cargo}", "${caminhoImagem}");`
    return database.executar(instrucaoSql)

}

function cadastrarUsuario(fkEmpresa, nome, sobrenome, telefone, email, senha, cargo) {
    console.log("Entrou na model de criação de usuário")
    var instrucaoSql = `INSERT INTO funcionario(fkEmpresa,nome,sobrenome,telefone,email,senha,cargo) VALUES(${fkEmpresa},"${nome}","${sobrenome}","${telefone}","${email}","${senha}","${cargo}");`
    return database.executar(instrucaoSql)

}

function listarUsuariosEmpresa(idEmpresa) {
    const instrucaoSql = `SELECT * FROM funcionario WHERE fkEmpresa = ${idEmpresa}`
    return database.executar(instrucaoSql)
}

function deletarUsuario(id) {
    const instrucaoSql = `DELETE FROM funcionario WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

function atualizarUsuario(nome, sobrenome, email, telefone, cargo, id) {
    const instrucaoSql = `UPDATE funcionario SET nome = "${nome}", sobrenome = "${sobrenome}", telefone = "${telefone}", email = "${email}", cargo = "${cargo}" where id = ${id}`
    return database.executar(instrucaoSql)
}

function atualizarImagemUsuario(nome, sobrenome, email, telefone, cargo, id, nome_imagem) {
    var caminhoImagem = "../assets/img/imagens-perfil/" + nome_imagem
    const instrucaoSql = `UPDATE funcionario SET nome = "${nome}", sobrenome = "${sobrenome}",
     telefone = "${telefone}", email = "${email}", cargo = "${cargo}", caminhoImagem = "${caminhoImagem}" where id = ${id}`
    return database.executar(instrucaoSql)
}

function cadastrarAdm(nome, sobrenome, telefone, email, senha, codigoEmpresa, cargo) {
    const caminhoPadrao = '../assets/img/foto-usuario.png'
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAdm():",
        nome,
        sobrenome,
        telefone,
        email,
        senha,
        cargo
    );
    var instrucaoSql = `
    INSERT INTO funcionario (nome, sobrenome, telefone, email, senha, fkEmpresa, cargo, caminhoImagem) VALUES 
        (
            '${nome}',
            '${sobrenome}',
            '${telefone}',
            '${email}',
            '${senha}',
            (SELECT id FROM empresa WHERE codigo_ativacao = '${codigoEmpresa}'), 
            '${cargo}',
            '${caminhoPadrao}'
        );
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    atualizarNomeUsuario,
    atualizarFotoUsuario,
    atualizarEmailUsuario,
    atualizarSenhaUsuario,
    carregarInformacoesUsuario,
    deletarUsuario,
    listarUsuariosEmpresa,
    adicionarFotoUsuario,
    cadastrarUsuario,
    atualizarImagemUsuario,
    atualizarUsuario,
    cadastrarAdm,
};