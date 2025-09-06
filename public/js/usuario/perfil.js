async function deletar() {
    const email = sessionStorage.getItem("email_ss");

    // janela de confirmação
    const confirmar = confirm("Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.");

    if (!confirmar) {
        return; // usuário cancelou
    }

    try {
        const resposta = await fetch("/usuarios/remove_register", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                output_email: email
            }),
        });

        console.log("resposta: ", resposta.status);

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "../index.html";
            }, 3000);
        } else {
            throw new Error("Erro ao deletar conta: " + resposta.status);
        }
    } catch (error) {
        alert("Erro: " + error.message);
    }
}


async function atualizar() {
    var email = sessionStorage.email_ss;
    try {
        var formData = new FormData();
        console.log(foto.files[0]);
        formData.append('output_email', email)
        formData.append('foto', foto.files[0])
        formData.append('tipo', sessionStorage.tipo)
        const resposta = await fetch("/usuarios/atualizarFoto", {
            method: "POST",
            body: formData
        });

        console.log("STATUS DA RESPOSTA: " + resposta.status)
        if (resposta.status == 201) {
            console.log("RESPOSTA FOI OK")
            atualizarNome(email);
            atualizarEmail(email);
            atualizarSenha(email);

            console.log("CHEGOU NO WINDOW LOCATION")

            setTimeout(() => {
                window.location = "../../perfil-visualizar.html"
            }, 1000);
        } else {
            throw new Error("Erro ao atualizar os dados da conta: " + resposta.status);
        }

    } catch (error) {
        console.log(error);
    }
}

function atualizarNome(emailUsuario) {
    var inputNome = document.getElementById('nome_input').value;
    console.log("VALOR DE INPUT NOME:" + inputNome)
    if (inputNome && inputNome.length < 3) {
        let mensagem = 'nome invalido! Minimo 3 caracteres';
        alert(mensagem);
        return

    }
    if (inputNome) {
        if (inputNome != "") {
            console.log("Atualizando nome para:", inputNome);
            fetch("/usuarios/mudarNome", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: inputNome,
                    emailUsuarioServer: emailUsuario,
                    tipoUsuarioServer: sessionStorage.tipo
                }),
            });
        }
        console.log("CHEGOU NA PARTE DE ATUALIZAR O NOME")
        sessionStorage.nome_ss = inputNome;
    }
}

function atualizarEmail(emailUsuario) {
    console.log("ENTROU NO ATUALIZAR EMAIL")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var inputEmail = document.getElementById('email_input');
    if (inputEmail.value && !emailRegex.test(inputEmail.value)) {
        alert("email invalido")
        return
    }
    if (inputEmail.value) {
        var novoEmail = inputEmail.value;
        if (novoEmail != "") {
            console.log("Atualizando email para:", novoEmail);
            fetch("/usuarios/mudarEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    novoEmailServer: novoEmail,
                    emailUsuarioServer: emailUsuario,
                    tipoUsuarioServer: sessionStorage.tipo
                }),
            });
        }
        console.log("CHEGOU NA PARTE DE ATUALIZAR O email")
        sessionStorage.email_ss = novoEmail
    }
}

function atualizarSenha(emailUsuario) {
    var inputSenha = document.getElementById('senha_input').value;


    if (inputSenha) {
        if (inputSenha != "") {
            if ((inputSenha.length < 8 || !/[A-Z]/.test(inputSenha))) {
                alert('Senha invalida! Minimo de 8 caracteres e deve conter 1 caracter maiúsculo');
                return
            }
            console.log("Atualizando a senha para:", inputSenha);
            fetch("/usuarios/mudarSenha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    novaSenhaServer: inputSenha,
                    emailUsuarioServer: emailUsuario,
                    tipoUsuarioServer: sessionStorage.tipo
                }),
            });
        }
    }
}

function carregarInformacoes() {
    var emailUsuarioSession = sessionStorage.email_ss;
    var tipoUsuario = sessionStorage.tipo
    if (!emailUsuarioSession) {
        alert("Você precisa estar logado para visualizar o perfil!");
        window.location = "./login.html";
        return;
    }

    fetch("/usuarios/carregarInformacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailUsuarioSession: emailUsuarioSession,
            tipoUsuarioSession: tipoUsuario
        })
    })
        .then(resposta => {
            if (!resposta.ok) throw "Erro ao carregar informações";
            return resposta.json();
        })
        .then(dados => {
            console.log("Dados do usuário:", dados);
            // preenche inputs

            if (dados[0].razaoSocial) {
                sessionStorage.nome_ss = dados[0].razaoSocial;
                sessionStorage.email_ss = dados[0].emailCorporativo;
                sessionStorage.imagem = dados[0].caminhoImagem;
            } else {
                sessionStorage.nome_ss = dados[0].nome;
                sessionStorage.email_ss = dados[0].email;
                sessionStorage.imagem = dados[0].caminhoImagem;
            }


            if (dados[0].caminhoImagem != "../assets/img/foto-usuario.png") {
                0
                document.getElementById("imagemUsuario").innerHTML = `
                <div class="rounded-md w-20 h-20 flex justify-center items-center bg-gray-300 mb-2"
                    style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>`;

                document.getElementById("imagemUsuarioPerfil").innerHTML = `
                 <div class="rounded-md w-20 h-20 flex justify-center items-center bg-gray-300 mb-2"
                    style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>`;

                document.getElementById("imagemUsuarioNavbar").innerHTML = `
                    <div class="rounded-md w-20 h-20 mb-2"
                        style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                    </div>
                `
            }else{
                console.log("CAIU NO ELSE")
                document.getElementById("imagemUsuario").innerHTML = `
                <div class="rounded-md w-20 h-20 flex justify-center items-center bg-gray-300 mb-2"
                    style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>`;

                document.getElementById("imagemUsuarioPerfil").innerHTML = `
                 <div class="rounded-md w-20 h-20 flex justify-center items-center bg-gray-300 mb-2"
                    style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                </div>`;

                document.getElementById("imagemUsuarioNavbar").innerHTML = `
                    <div class="rounded-md w-20 h-20 mb-2"
                        style="background-image: url(${dados[0].caminhoImagem}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                    </div>
                `
            }

            var inputFoto = document.getElementById("foto");
            var mensagemImagemUsuario = document.getElementById("mensagemImagemUsuario");

            inputFoto.addEventListener('change', function () {
                if (inputFoto.files.length > 0) {
                    var nomeArquivo = inputFoto.files[0].name;
                    mensagemImagemUsuario.innerHTML = `Imagem selecionada: "${nomeArquivo}".`;
                } else {
                    mensagemImagemUsuario.innerHTML = '';
                }
            })

        })
        .catch(erro => {
            console.error(erro);
            alert("Não foi possível carregar as informações do usuário.");
        });
    // Corrige o erro de "window"
}
window.onload = carregarInformacoes;
