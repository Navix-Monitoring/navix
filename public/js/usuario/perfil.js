async function deletar() {
    var confimar = confirmar_input.value;
    var email = sessionStorage.email_ss;

    if (!confimar || confimar != "CONFIRMO") {
        let mensagem = "Se deseja deletar a conta digite 'CONFIRMO'."
        return mostrarErro(mensagem);
    }

    try {
        const resposta = await fetch("/usuarios/remove_register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                output_email: email
            }),
        });

        console.log("resposta: ", resposta.status);

        if (resposta.ok) {
            mensagem_erro.innerHTML = "Remoção conta realizado com sucesso! Redirecionando...";
            cardErro.style.display = "block";
            setTimeout(() => {
                window.location = "../index.html";
            }, 3000);

        } else {
            throw new Error("Erro ao deletar conta: " + resposta.status);
        }

    } catch (error) {
        return mostrarErro(error);
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

        if (resposta.ok) {
            atualizarEmail(email);
            atualizarNome(email);
            atualizarSenha(email);
            
            mensagem_erro.innerHTML = "Dados da conta atualizados com sucesso";
            cardErro.style.display = "block";

            const json = await resposta.json();
            sessionStorage.email_ss = json.email;
            sessionStorage.nome_ss = json.nome;

        } else {
            throw new Error("Erro ao atualizar os dados da conta: " + resposta.status);
        }

    } catch (error) {
        return mostrarErro(error);
    }
}

function atualizarNome(emailUsuario) {
    var inputNome = document.getElementById('nome_input');
    if (inputNome.length < 3) {
        let mensagem = 'nome invalido! Minimo 3 caracteres';
        return mostrarErro(mensagem);

    }
    if (inputNome) {
        var novoNome = inputNome.value;
        if (novoNome != "") {
            console.log("Atualizando nome para:", novoNome);
            fetch("/usuarios/mudarNome", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: novoNome,
                    emailUsuarioServer: emailUsuario,
                    tipoUsuarioServer: sessionStorage.tipo
                }),
            });
        }
    }
}

function atualizarEmail(emailUsuario) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var inputEmail = document.getElementById('email_input');
    if (!emailRegex.test(inputEmail)) {
        let mensagem = "Email inválido!";
        return mostrarErro(mensagem);

    }
    if (inputEmail) {
        var novoEmail = inputEmail.value;
        if (novoEmail != "") {
            console.log("Atualizando nome para:", novoEmail);
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
    }
}

function atualizarSenha(emailUsuario) {
    var inputSenha = document.getElementById('senha_input');
    if ((inputSenha.length < 8 || !/[A-Z]/.test(inputSenha))) {
        let mensagem = 'Senha invalida! Minimo de 8 caracteres e deve conter 1 caracter maiúsculo';
        return mostrarErro(mensagem);
    }
    if (inputSenha) {
        var novaSenha = inputSenha.value;
        if (novaSenha != "") {
            console.log("Atualizando a senha para:", novaSenha);
            fetch("/usuarios/mudarSenha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    novaSenhaServer: novaSenha,
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
                document.getElementById('nome_input').value = dados[0].razaoSocial;
                document.getElementById('email_input').value = dados[0].emailCorporativo;
                document.getElementById('b_usuario').innerHTML = dados[0].razaoSocial;
            } else {
                document.getElementById('nome_input').value = dados[0].nome;
                document.getElementById('email_input').value = dados[0].email;
                document.getElementById('b_usuario').innerHTML = dados[0].nome;
            }


            // se tiver imagem
            // if (dados[0].caminhoImagem) {
            //     document.getElementById("imagemUsuario").innerHTML = `
            //         <img src="${dados[0].caminhoImagem}" alt="Imagem do Usuário">
            //         <input type="file" id="foto" name="foto" hidden>
            //         <label for="foto" class="upload" style="margin-top: 10px;">
            //             Escolher imagem
            //         </label>
            //         <p id="mensagemImagemUsuario" style="margin-top: 10px; padding-bottom: 10px"></p>
            //     `;
            // }
        })
        .catch(erro => {
            console.error(erro);
            alert("Não foi possível carregar as informações do usuário.");
        });
    // Corrige o erro de "window"
}
window.onload = carregarInformacoes;
