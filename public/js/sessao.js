function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && apelido != null) {
        b_usuario.innerHTML = apelido;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function finalizarAtualizar() {
    cardErro.style.display = "none";
}

function iniciarQuizz() {
    window.location = "./quizz.html";
}