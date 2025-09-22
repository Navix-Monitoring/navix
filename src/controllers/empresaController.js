var usuarioModel = require("../models/empresaModel");
var hashPwdUser = require("../utils/hash")

/*async function deletar(req, res) {
  try {
    const { output_email } = req.body;

    // validação de campo
    if (!output_email) {
      return res.status(400).send("Erro ao fazer deletar conta! Entre em contato com a gente (navixsuporte@gmail.com)");
    }

    // remoção da conta no BD
    const resultado = await usuarioModel.deletarempresa(output_email);

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
}*/

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
    const senha = await hashPwdUser.hashPassword(output_senha);

    // Verificação de duplicidade
    console.log("output email  " + output_email)
    const usuarios = await empresaModel.verificarEmail(output_email);

    if (usuarios.some(user => user.email === output_email)) {
      return res.status(409).send("Email já cadastrado.");
    }

    const resultado = await empresaModel.cadastrar(output_razaoSocial, output_cnpj, output_email, senha);

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

module.exports = {
cadastrar
}