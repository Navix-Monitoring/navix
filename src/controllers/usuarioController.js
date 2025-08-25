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
    console.log("output email  " + output_email)
    const usuarios = await usuarioModel.verificarEmail(output_email);

    if (usuarios.some(user => user.email === output_email)) {
      return res.status(409).send("Email já cadastrado.");
    }

    const resultado = await usuarioModel.cadastrar(output_razaoSocial, output_cnpj, output_email, senhaHash);

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
    const { output_email, output_senha } = req.body

    // validação dos campos
    if (!output_email || !output_senha) {
      return res.status(401).send("Erro ao fazer login! Preencha todos os campos");
    }

    // // verificação de ativação de conta
    // const resultadoAtivacao = await usuarioModel.verificarAtivacaoConta(output_email);

    // if (!resultadoAtivacao) {
    //   return res.status(400).send("Login não encontrado. Realize o cadastro ou insira novamente seu login.");
    // }

    // if (resultadoAtivacao.status == "inativo") {
    //   return res.status(400).send("Faça a ativação da conta. Verifique seu E-mail.");
    // }

    //pegando dados do banco
    const verificarLogin = await usuarioModel.autenticarLogin(output_email);

    // Bollean de hash (comparação)
    const validacaoHash = await hashPwdUser.comparePassaword(output_senha, verificarLogin.senhaHash);

    if (!validacaoHash) {
      return res.status(400).send("Senha incorreta!");
    }

    console.log(`Resultados: `, verificarLogin);

    return res.json(verificarLogin);

  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}

async function atualizar(req, res) {
  try {
    const {
      output_razaoSocial,
      output_email,
      output_senha,
      output_emailAntigo
    } = req.body;

    // Validação do campos
    if (!output_email || !output_senha || !output_razaoSocial) {
      return res.status(400).send("Preencha E-mail, Senha e Razão Social.");
    }

    // criptografando a senha
    const senhaHash = await hashPwdUser.hashPassword(output_senha);

    const resultado = await usuarioModel.atualizarCampos(output_razaoSocial, output_email, senhaHash, output_emailAntigo);

    // Reusultado da atualização dos dados no banco
    if (resultado) {
      res.status(201).json(resultado);
    } else {
      res.status(500).send("Erro ao atualizar dados da conta.");
    }
    
  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}

async function deletar(req, res) {
  try {
    const { output_email } = req.body;

    // validação de campo
    if (!output_email) {
      return res.status(400).send("Erro ao fazer deletar conta! Entre em contato com a gente (navixsuporte@gmail.com)");
    }

    // remoção da conta no BD
    const resultado = await usuarioModel.deletar_conta(output_email);

    // validação de remoção de conta
    if (resultado) {
      res.status(200).json("Conta deletada com sucesso!");
    }

    if (!resultado) {
      return res.status(404).send("Conta não encontrada.");
    }

  } catch (error) {
    console.error("\nHouve um erro no servidor ao deletar conta.: ", error.sqlMessage || error);
    res.status(500).json(error.sqlMessage || "Erro interno do servidor.");
  }
}

module.exports = {
  autenticar,
  cadastrar,
  deletar,
  atualizar
}