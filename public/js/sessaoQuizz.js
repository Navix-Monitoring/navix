function iniciarQuizz() {
    let divApagar = document.getElementById('telaDeInicio');
    divApagar.style.display = "none";

    let divAparecerQuestoes = document.getElementById('indexQuiz');
    divAparecerQuestoes.style.display = 'block'
    startQuiz()
}
let quiz = [];

function listandoJsonQuestoes(questoes) {
    const json = questoes.map(q => (

        {
            questao: q.questao,
            alternativas: q.alternativas.split(".,"),
            pontos: q.pontos.split(",").map(Number)
        }
    ));
    console.log(json[0].pontos)
    quiz = json
    console.log(json[1].alternativas);
    iniciarQuizz()
    // // console.log(quizz[0].pontos[0], typeof quizz[0].pontos[0]);
    // for (i = 0; i < quizz[0].pontos.length; i++) {
    //     console.log(quizz[0].pontos[i]);

    // }
    //     // console.log(questoes[0].pontos[0], typeof questoes[0].pontos[0] );
    //     // console.log(questoes[0].alternativas[0])
}

let proximaQuestao = document.getElementById('proxima_questao');
let divButtons = document.getElementById('buttons_respostas');
let buttonQuestao = document.getElementById('questao');
let buttonAlternativas = document.getElementById('alternativas');

let questaoDaVezIndex = 0;
let pontuacao = [];
let idQuestaoRespondida = [];

function startQuiz() {
    questaoDaVezIndex = 0;
    mostrarquestão();
}

let SavePointPotuacao = 0;
let indexStyle = 0;

function mostrarquestão() {
    let questaoDaVez = quiz[questaoDaVezIndex];
    let numumeroDaQuestao = questaoDaVezIndex + 1;
    idQuestaoRespondida.push(numumeroDaQuestao);
    buttonQuestao.innerHTML = numumeroDaQuestao + '. ' + questaoDaVez.questao;

    questaoDaVez.alternativas.forEach((alternativa, index) => {
        const button = document.getElementById(`alternativas${index}`);

        if (button) {

            button.innerText = alternativa;
            button.onclick = () => {
                document.getElementsByClassName(`btn${indexStyle}`)[0].style.backgroundColor = '#6d28d9';
                document.getElementsByClassName(`btn${indexStyle}`)[0].style.color = 'white';
                document.getElementsByClassName(`btn${indexStyle}`)[0].style.border = '1px solid #cccccc';
                indexStyle = index; // guardando index para caso ocorra uma mudança.
                console.log(`Você clicou: ${alternativa}`);
                SavePointPotuacao = 0;
                document.getElementsByClassName(`btn${index}`)[0].style.backgroundColor = '#5600b2';
                document.getElementsByClassName(`btn${index}`)[0].style.color = 'black';
                document.getElementsByClassName(`btn${indexStyle}`)[0].style.border = '1px solid black';
                SavePointPotuacao = (questaoDaVez.pontos[index]);
                console.log(SavePointPotuacao);
            }
        }
    });
}

function proximaQuestaoDoQuizz() {
    if (questaoDaVezIndex < 3) {
        questaoDaVezIndex += 1;
        pontuacao.push(SavePointPotuacao);
        mostrarquestão();
        console.log(questaoDaVezIndex);
        console.log(pontuacao);

    } else if (questaoDaVezIndex === 3) {
        questaoDaVezIndex += 1;
        pontuacao.push(SavePointPotuacao);
        proximaQuestao.style.width = '30%'
        proximaQuestao.style.textAlign = 'center'
        proximaQuestao.innerHTML = "Finalizar Questionario"
        mostrarquestão();
        console.log(questaoDaVezIndex);
        console.log(pontuacao);

    } else if (questaoDaVezIndex === 4) {
        pontuacao.push(SavePointPotuacao);
        finalizarQuestionario()
    }
}

function finalizarQuestionario() {
    idUser = sessionStorage.ID_user;
    inserindoResultadoQuiz(idUser, idQuestaoRespondida, pontuacao)
    console.log(idUser, idQuestaoRespondida, pontuacao)
}