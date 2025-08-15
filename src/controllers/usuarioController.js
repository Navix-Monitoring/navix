var usuarioModel = require("../models/usuarioModel");
var hashPwdUser = require("../utils/hash")

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    // Validação
    if (!nome || !email || !senha) {
      return res.status(400).send("Preencha todos os campos corretamente.");
    }

    // criptografando a senha
    const passwordHash = await hashPwdUser.hashPassword(senha);
  
    // Verificação de duplicidade
    const usuarios = await usuarioModel.verificarEmail(email);

    const emailJaExiste = usuarios.some(user => user.email === email);

    if (emailJaExiste) {
      return res.status(409).send("Email já cadastrado.");
    }

    // Cadastrando Usuario no banco
    const resultado = await usuarioModel.cadastrar(nome, email, senhaHash);
    
    if (resultado) {
      res.status(201).json(resultado);
    } else {
      res.status(500).send("Erro ao cadastrar o usuário.");
    }
  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}

async function autenticar(req, res) {
  try {
    const {loginEmail, loginSenha} = req.body
    
    // validação
    if (!loginEmail || !loginSenha) {
      return res.status(400).send("Erro ao fazer login! Preencha os campos.")
    }
    
    //pegando dados do banco
    const verificarLogin = await usuarioModel.verificarLogin(loginEmail, loginSenha);
    
    if (!verificarLogin) {
      return res.status(404).send("Login não encontrado! Realize o cadastro ou insira novamente seu login.")
    }

    // Bollean de hash (comparação)
    const validacaoHash = await hashPwdUser.comparePassaword(loginSenha, verificarLogin.senhaHash);

    if (!validacaoHash) {
      return res.status(400).send("Senha incorreta!")
    }

    console.log(`Resultados: `, JSON.stringify(verificarLogin));

    return res.json(verificarLogin);
  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}

module.exports = {
  autenticar,
  cadastrar,
}