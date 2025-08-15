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
    const resultado = await usuarioModel.cadastrar(nome, email, passwordHash);
    
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

module.exports = {
  autenticar,
  cadastrar,
}