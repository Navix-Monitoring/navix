var quizzModel = require("../models/quizzModel");

function inserindoResultadoQuiz(req, res) {
    let idUsuario = req.body.idUsuario;
    const idQuestao = req.body.idQuestao;
    const idPontuacao = req.body.idPontuacao;
    
    if (!idUsuario || !idQuestao || !idPontuacao) {
        return res.status(400).send("Campos obrigatorios faltando!");
    }

    quizzModel.inserindoResultadoQuiz(idUsuario, idQuestao, idPontuacao)
        .then(resultado => {
            if (resultado) {
                res.status(201).json(resultado);
            } else {
                res.status(500).send("Erro ao inserir resultado do questionário.");
            }
        })
        .catch(erro => {
            if (erro.status) {
                res.status(erro.status).send(erro.message);
            } else {
                console.error("Erro ao inserir resultado do quizz:", erro);
                res.status(500).json(erro.sqlMessage || erro.message);
            }
        });
}

    function listarQuestoes(req, res) {
        quizzModel.listarQuestoes()
        .then(listaQuestoes => {
            if (listaQuestoes && listaQuestoes.length > 0) {
                res.status(200).json(listaQuestoes);
            } else {
                res.status(400).send("Erro ao listar as questões no Banco.");
            }
        })
        .catch(erro => {
            console.error('Erro ao achar questões', erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        })
    }

module.exports = {
    listarQuestoes,
    inserindoResultadoQuiz
};