var usuarioModel = require("../models/usuarioModel");

function deletarUsuario(req, res) {
  var id = req.params.id;
  usuarioModel
    .deletarUsuario(id)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o usuário");
      res.status(500).json(erro.sqlMessage);
    });
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
    console.log("ERRO AO CADASTRAR USUÁRIO:", erro);
    // CORRIJA PARA ESTA LINHA:
    return res.status(500).json({ msg: "Falha ao cadastrar usuário.", error: erro });
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
            fkcargo: resultadoAutenticar[0].fkCargo,
            cargo: resultadoAutenticar[0].titulo,
            fkEmpresa: resultadoAutenticar[0].fkEmpresa,
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
  // var tipoUsuario = req.body.tipoUsuarioSession; // Variável 'tipoUsuario' não usada

  console.log("Email do usuário: ", emailUsuario);
  usuarioModel.carregarInformacoesUsuario(emailUsuario)
    .then(function (resultado) {
      console.log("Resultado: ", resultado);
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log("ERRO AO CARREGAR INFORMAÇÕES:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}


function cadastrarAdm(req, res) {
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var telefone = req.body.telefoneServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var codigoEmpresa = req.body.codigo_empresaServer;
  var cargo = "Administrador";

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (codigoEmpresa == undefined) {
    res.status(400).send("Empresa não encontrada");
  } else if (cargo == undefined) {
    res.status(400).send("Cargo está undefinied!");
  } else {
    usuarioModel.cadastrarAdm(nome, sobrenome, telefone, email, senha, codigoEmpresa, cargo)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);

        if (erro.errno === 1062) {
          res.status(409).send("Esse email já está cadastrado! Tente outro");
          return;
        }
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function mudarStatus(req, res) {
  var novoStatus = req.body.statusServer;
  var emailUsuario = req.body.emailServer;
  if (novoStatus == undefined) {
    res.status(400).send("O novoStatus está undefined!");
  } else if (emailUsuario == undefined) {
    res.status(400).send("O emailUsuario está undefined!");
  } else {
    usuarioModel.atualizarStatusPerfil(novoStatus, emailUsuario)
      .then(function (resultado) {
        console.log("Resultado: ", resultado);
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao mudar o status do perfil");
        res.status(500).json(erro.sqlMessage);
      });
  }
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
  listarUsuariosEmpresa,
  cadastrarAdm,
  mudarStatus
}