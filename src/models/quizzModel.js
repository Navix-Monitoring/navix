var database = require("../database/config");

function inserindoResultadoQuiz(idUsuario, idQuestao, idPontuacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    console.log(idUsuario, idQuestao, idPontuacao);

        const instrucaoSql = [];

    for (let i = 0; i < idQuestao.length; i++) {
        instrucaoSql.push(`
            INSERT INTO ficha_tecnica (fkuser, fkquiz_perguntas, pontuacao)
            VALUES (${idUsuario}, ${idQuestao[i]}, ${idPontuacao[i]});
        `);
    }

    // Executa todos os comandos em paralelo
    const promessas = instrucaoSql.map(sql =>
        database.executar(sql)
    );

    return Promise.all(promessas)
        .then(() => {
            console.log("Todas as instruções executadas com sucesso.");
            return criandoFichaDoUsuario(idUsuario);
        })
        .catch(erro => {
            console.error("Erro ao inserir resultados:", erro);
            throw erro;
        });

}

function criandoFichaDoUsuario(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    var instrucaoSql = `
    INSERT INTO ficha_resultado (fkuser, dataFinalizacao, pontuacao_total, fkfeedback)
    SELECT
        pontos.fkuser,
        CURDATE(),
        pontos.total_pontos,
        f.id
    FROM (
        SELECT fkuser, SUM(pontuacao) AS total_pontos
        FROM ficha_tecnica
        WHERE fkuser = ${idUsuario}
        GROUP BY fkuser
    ) AS pontos
    JOIN feedback f
    ON pontos.total_pontos BETWEEN f.pontuacao_min AND f.pontuacao_max;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarQuestoes() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    var instrucaoSql = `
       SELECT
    qp.pergunta as questao,
    GROUP_CONCAT(pg.texto ORDER BY pg.valor) as alternativas,
    GROUP_CONCAT(pg.valor ORDER BY pg.valor) as pontos
    FROM quiz_perguntas qp
    JOIN alternativas pg ON qp.id = pg.fkquiz_perguntas
    GROUP BY qp.id, qp.pergunta;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarQuestoes,
    inserindoResultadoQuiz,
    criandoFichaDoUsuario,
};