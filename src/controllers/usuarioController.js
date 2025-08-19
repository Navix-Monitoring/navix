var usuarioModel = require("../models/usuarioModel");
var hashPwdUser = require("../utils/hash")

async function cadastrar(req, res) {
  try {
    const { 
      output_razaoSocial,
      output_email,
      output_senha,
      output_cnpj
    } = req.body;

    // Validação do campos
    if (!output_email || !output_senha) {
      return res.status(400).send("Preencha E-mail e Senha.");
    }
    
    if (!output_razaoSocial || !output_cnpj) {
      return res.status(400).send("Preencha CNPJ e Razão Social.")
    }

    // criptografando a senha
    const senhaHash = await hashPwdUser.hashPassword(output_senha);

    // Verificação de duplicidade
    const usuarios = await usuarioModel.verificarEmail_CNPJ(output_email, output_cnpj);

    if (usuarios.some(user => user.output_email === output_email)) {
      return res.status(409).send("Email já cadastrado.");
    }

      resultado = await usuarioModel.cadastrar(output_razaoSocial, output_cnpj, output_email, senhaHash);
    
    // Reusultado do cadastro no banco
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
    const { loginEmail, loginSenha } = req.body

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

async function atualizar(req, res) {
  try {
    const email = sessionStorage.EMAIL_USUARIO;


  } catch (error) {

  }
}

async function deletar(req, res) {
  try {
    const email = sessionStorage.EMAIL_USUARIO;


  } catch (error) {

  }
}

module.exports = {
  autenticar,
  cadastrar,
}