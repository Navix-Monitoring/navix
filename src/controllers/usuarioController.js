var usuarioModel = require("../models/usuarioModel");

async function deletarUsuario(req, res) {
  try {
    const {
      id
    } = req.params

    await usuarioModel.deletarUsuario(id)

    return res.status(200).send("Usuário foi deletado com sucesso!!!!!!")
  } catch (erro) {
    return res.status(500).send("Não deu certo ein!!")
  }
}

async function cadastrarUsuario(req, res) {
  try {
    if (!req.body.fkEmpresa || req.body.nome == "" || req.body.sobrenome == "" || req.body.telefone == ""
      || req.body.email == "" || req.body.senha == "" || req.body.cargo == "") {
      return res.status(400).send("Os campos não foram preenchidos corretamente")
    } else {
      if (req.file) {
        await usuarioModel.adicionarFotoUsuario(req.body.fkEmpresa, req.body.nome, req.body.sobrenome, req.body.telefone,
          req.body.email, req.body.senha, req.body.cargo, req.file.filename)
        return res.status(200).send("Deu certo!!!")
      } else {
        await usuarioModel.cadastrarUsuario(req.body.fkEmpresa, req.body.nome, req.body.sobrenome, req.body.telefone,
          req.body.email, req.body.senha, req.body.cargo)
        return res.status(200).send("Deu certo!!!")
      }

    }
  } catch (erro) {
    return res.status(500).send("Erro ao cadastrar usuário")
  }
}

async function atualizarUsuario(req, res) {
  try {
    if (req.body.nome == "" || req.body.sobrenome == "" || req.body.telefone == "" || req.body.email == "" || req.body.cargo == "") {
      return res.status(400).send("Os campos não foram preenchidos corretamente")
    } else {
      if (req.file) {
        await usuarioModel.atualizarImagemUsuario(req.body.nome, req.body.sobrenome, req.body.email, req.body.telefone, req.body.cargo, req.body.id,
          req.file.filename
        )
        return res.status(200).send("Deu certo!!!")
      } else {
        await usuarioModel.atualizarUsuario(req.body.nome, req.body.sobrenome, req.body.email, req.body.telefone, req.body.cargo, req.body.id)
        return res.status(200).send("Deu certo!!!")
      }

    }
  } catch (erro) {
    return res.status(500).send("Erro ao cadastrar usuário")
  }
}

async function listarUsuariosEmpresa(req, res) {
  try {
    const {
      id
    } = req.params

    var usuarios = await usuarioModel.listarUsuariosEmpresa(id)
    console.log(usuarios)
    return res.status(200).json(usuarios)

  } catch (erro) {
    console.log(erro)
    return res.status(500).send("Não deu certo!!")
  }
}

async function autenticar(req, res) {
var email = req.body.output_email;
  var senha = req.body.output_senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        if (resultadoAutenticar.length == 1) {
          res.json({
            id: resultadoAutenticar[0].id,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            codigoAtivacao: resultadoAutenticar[0].codigoAtivacao,
            cargo: resultadoAutenticar[0].cargo
          });
        } else {
          res.status(403).send("Email e/ou senha inválido(s)");
        }
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
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
     /* if (tipo == 1) {
        const resultado = usuarioModel.atualizarFotoEmpresa(imagem, email);

        // Reusultado da atualização dos dados no banco
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao atualizar dados da conta.");
        }
      }*/
        const resultado = usuarioModel.atualizarFotoUsuario(imagem, email);

        // Reusultado da atualização dos dados no banco
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao atualizar dados da conta.");
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

/*  if (tipo == 1) {
    usuarioModel.atualizarNomeEmpresa(novoNome, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {*/
    usuarioModel.atualizarNomeUsuario(novoNome, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
}

function mudarEmail(req, res) {
  console.log("ENTROU NO MUDAR EMAIL")
  var novoEmail = req.body.novoEmailServer;
  var emailUsuario = req.body.emailUsuarioServer;

  var tipo = req.body.tipoUsuarioServer;

  /*if (tipo == 1) {
    usuarioModel.atualizarEmailEmpresa(novoEmail, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {*/
    usuarioModel.atualizarEmailUsuario(novoEmail, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  //}

}

async function mudarSenha(req, res) {
  console.log("MUDAR SENHA")
  var novaSenha = req.body.novaSenhaServer;
  var emailUsuario = req.body.emailUsuarioServer;

 /* if (tipo == 1) {
    usuarioModel.atualizarSenhaEmpresa(senha, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {*/
    usuarioModel.atualizarEmailUsuario(senha, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
 // }

}

function carregarInformacoes(req, res) {
  console.log("Entrou no carregarInformacoes");
  var emailUsuario = req.body.emailUsuarioSession;
  var tipoUsuario = req.body.tipoUsuarioSession;

  console.log("Email do usuário: ", emailUsuario);

  /*if (tipoUsuario == 1) {
    usuarioModel.carregarInformacoesEmpresa(emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  } else {*/
    usuarioModel.carregarInformacoesUsuario(emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      });
  //}

}

module.exports = {
  autenticar,
  mudarNome,
  mudarEmail,
  mudarSenha,
  atualizar,
  carregarInformacoes,
  deletarUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  listarUsuariosEmpresa
}