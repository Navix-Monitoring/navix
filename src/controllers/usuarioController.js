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
    const senha = await hashPwdUser.hashPassword(output_senha);

    // Verificação de duplicidade
    console.log("output email  " + output_email)
    const usuarios = await usuarioModel.verificarEmail(output_email);

    if (usuarios.some(user => user.email === output_email)) {
      return res.status(409).send("Email já cadastrado.");
    }

    const resultado = await usuarioModel.cadastrar(output_razaoSocial, output_cnpj, output_email, senha);

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
    console.log("VAI VERIFICAR O LOGIN: ")

    const verificarLoginEmpresa = await usuarioModel.autenticarLoginEmpresa(output_email);

    if (verificarLoginEmpresa.length > 0 && verificarLoginEmpresa[0].emailCorporativo) {
      console.log("REPOSTA DO BANCO: " + verificarLoginEmpresa)
      // Bollean de hash (comparação)
      const validacaoHash = await hashPwdUser.comparePassaword(output_senha, verificarLoginEmpresa[0].senha);

      if (!validacaoHash) {
        return res.status(400).send("Senha incorreta!");
      }

      console.log(`Resultados: `, verificarLoginEmpresa);

      return res.json(verificarLoginEmpresa);
    } else {
      const verificarLoginUsuario = await usuarioModel.autenticarLoginUsuario(output_email);

      if (verificarLoginUsuario[0].email) {

        const validacaoHash = await hashPwdUser.comparePassaword(output_senha, verificarLoginUsuario[0].senha);

        if (!validacaoHash) {
          return res.status(400).send("Senha incorreta!");
        }

        console.log(`Resultados: `, verificarLoginUsuario);

        return res.json(verificarLoginUsuario);
      } else {
        return res.status(400).send("Usuário não cadastrado")
      }
    }

  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}

function atualizar(req, res) {
  try {
    console.log("ENTROU NO CONTROLLER ATUALIZAR")
    var email = req.body.output_email;

    if (req.file) {
      console.log("ENTRA NO ID")
      var imagem = req.file.filename;
      console.log("PASSOU")
      var tipo = req.body.tipo;

      console.log("TIPO: ", typeof (tipo))
      if (tipo == 1) {
        const resultado = usuarioModel.atualizarFotoEmpresa(imagem, email);

        // Reusultado da atualização dos dados no banco
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao atualizar dados da conta.");
        }
      } else {
        const resultado = usuarioModel.atualizarFotoUsuario(imagem, email);

        // Reusultado da atualização dos dados no banco
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao atualizar dados da conta.");
        }
      }
    }
    console.log("CHEGOU AQUI")
    return res.status(201).json({
      email: email
    });
  }
  catch (erro) {
    console.error("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage || erro);
    res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
  }
}


function mudarNome(req, res) {
  var novoNome = req.body.nomeServer;
  var emailUsuario = req.body.emailUsuarioServer;

  var tipo = req.body.tipoUsuarioServer;

  if (tipo == 1) {
    usuarioModel.mudarNomeEmpresa(novoNome, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {
    usuarioModel.mudarNomeUsuario(novoNome, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  }
}

function mudarEmail(req, res) {
  console.log("ENTROU NO MUDAR EMAIL")
  var novoEmail = req.body.novoEmailServer;
  var emailUsuario = req.body.emailUsuarioServer;

  var tipo = req.body.tipoUsuarioServer;

  if (tipo == 1) {
    usuarioModel.mudarEmailEmpresa(novoEmail, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {
    usuarioModel.mudarEmailUsuario(novoEmail, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  }

}

async function mudarSenha(req, res) {
  console.log("MUDAR SENHA")
  var novaSenha = req.body.novaSenhaServer;
  var emailUsuario = req.body.emailUsuarioServer;

  var tipo = req.body.tipoUsuarioServer;

  const senha = await hashPwdUser.hashPassword(novaSenha);

  if (tipo == 1) {
    usuarioModel.mudarSenhaEmpresa(senha, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {
    usuarioModel.mudarEmailUsuario(senha, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
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

function carregarInformacoes(req, res) {
  console.log("Entrou no carregarInformacoes");
  var emailUsuario = req.body.emailUsuarioSession;
  var tipoUsuario = req.body.tipoUsuarioSession;

  console.log("Email do usuário: ", emailUsuario);

  if (tipoUsuario == 1) {
    usuarioModel.carregarInformacoesEmpresa(emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {
    usuarioModel.carregarInformacoesUsuario(emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  }

}

module.exports = {
  autenticar,
  mudarNome,
  mudarEmail,
  mudarSenha,
  cadastrar,
  deletar,
  atualizar,
  carregarInformacoes
}