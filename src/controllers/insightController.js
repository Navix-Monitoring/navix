var insightModel = require("../models/insightModel");

function inserirNota(req, res) {
  const { idUsuario, notaUser, posterId } = req.body;

  if (!idUsuario || !posterId || notaUser == null) {
    return res.status(400).send("Campos obrigatórios faltando!");
  }

  insightModel.verificarPosterListar(idUsuario, posterId)
    .then(poster => {
      if (!poster) {
        return res.status(400).send("Poster já avaliado!");;
      } else {
        return insightModel.inserirNotaPessoal(idUsuario, posterId, notaUser);
      }

    })
    .then(() => {
      res.status(201).send("Nota inserida com sucesso.");
    })
    .catch((erro) => {
      if (erro.status) {
        res.status(erro.status).send(erro.message);
      } else {
        console.error("Erro ao inserir nota:", erro);
        res.status(500).json(erro.sqlMessage || erro.message);
      }
    });
}


function listaMediaPorPoster(req, res) {
  let posterId = req.query.posterId;

  if (!posterId) {
    return res.status(400).send("Campos obrigatórios faltando!");
  }

  insightModel.listarMediaPoster(posterId).then((resultado) => {
    if (resultado.length > 0) { // if só uma verificação padrão 
      res.status(200).json(resultado[0].media); // Retorna a média

    } else {
      res.status(404).send("Poster não encontrado ou sem avaliações.");
    }
  })
    .catch((erro) => {
      console.log(`Erro ao achar ${posterId}`, erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function atualizarPoster(req, res) {
  insightModel.buscarMediaEmTodosOsPoster()
    .then(resultado => {
      if (!resultado || resultado.length === 0) { // if só uma verificação padrão 
        res.status(404).send("Poster não encontrado ou sem avaliações.");

      } else {
        res.status(200).json(resultado); // Retorna o como json
      }
    })
    .catch((erro) => {
      console.log(`Erro ao achar `, erro);
      console.error("Erro na rota /insight/poster:", erro);

      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function buscarAvaliacoes(req, res) {
  insightModel.buscarAvaliacoes()
    .then(comunidade => {
      
      if (comunidade) {
        res.status(200).json(comunidade);

      } else {
        res.status(401).send("Avaliações não foram encontrada");
      }

    })
    .catch(erro => {
      console.log('Erro ao achar ', erro);
      console.error("Erro na rota /insight/buscarAvaliacoes: ", erro);

      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function listandoResultadoDoQuiz(req, res) {
  let idUsuario = req.query.idUsuario;
  console.log('id usuario ', idUsuario);
  
  
  insightModel.listandoResultadoDoQuiz(idUsuario)
    .then(softSkill => {

      if (softSkill) {
        res.status(200).json(softSkill);

      } else {
        res.status(401).send("Questionario não recebido");
      }

    })
    .catch(erro => {
      console.log('Erro ao achar ', erro);
      console.error("Erro na rota /insight/buscarAvaliacoes: ", erro);

      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function listaPontuacaoDoUsuario(req, res) {
  let idUsuario = req.query.idUsuario;
  console.log('id usuario ', idUsuario);
  
  
  insightModel.listaPontuacaoDoUsuario(idUsuario)
    .then(lista => {

      if (lista) {
        res.status(200).json(lista);

      } else if (lista.length < 0) {
        lista = 0;
        res.status(200).json(lista);

      } else {
        res.status(401).send("lista pontuação não foi recebida");
      }

    })
    .catch(erro => {
      console.log('Erro ao achar ', erro);
      console.error("Erro na rota /insight/buscarAvaliacoes: ", erro);

      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

module.exports = {
  inserirNota,
  listaMediaPorPoster,
  atualizarPoster,
  buscarAvaliacoes,
  listandoResultadoDoQuiz,
  listaPontuacaoDoUsuario
};
