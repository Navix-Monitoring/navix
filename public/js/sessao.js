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

function finalizarAguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    cardErro.style.display = "none";
}