var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var login = req.body.loginServer;
  var senha = req.body.senhaServer;

  if (!login) {
    res.status(400).send("Seu login está undefined!");
  } else if (!senha) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.autenticar(login, senha)
      .then((resultado) => {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length === 1) {
          const user = resultado[0];

          return res.json({
            id: user.id,
            email: user.email,
            nome: user.nome,
            senha: user.senha,
            apelido: user.apelido,
          });
          
        } else if (resultado.length === 0) {
          res.status(403).send("Login ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login!");
        }
      })
      .catch((erro) => {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}


function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var apelido = req.body.apelidoServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores | da pra simplificar
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (apelido == undefined) {
    res.status(400).send("Seu apelido está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    usuarioModel.verificarEmailOuApelidoExistente(email, apelido)
      .then(usuarios => {
        let mensagem = "";

          for (i = 0; i < usuarios.length; i++) {
            const user = usuarios[i];

            if (user.email === email && !mensagem.includes('Email já Cadastrado')) {
              mensagem += "Email já cadastrado. ";
            }

            if (user.apelido === apelido && !mensagem.includes("Apelido já cadastrado")) {
              mensagem += "Apelido já cadastrado. ";
            }
          }
          
          if (mensagem !== "") {
            return res.status(409).send(mensagem);
          }

        return usuarioModel.cadastrar(nome, apelido, email, senha);
      })
      .then(resultado => { // e o res
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao cadastrar o usuário.");
        }
      })
      .catch(erro => {
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
}