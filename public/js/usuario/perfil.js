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
    var razaoSocial = razaoSocial_input.value;
    var email = email_input.value;
    var senha = senha_input.value;
    var emailAntigo = sessionStorage.email_ss;
    const verificacao = [razaoSocial, email, senha];
    const padrao = /["'!()\/\\|;\-\]\[{}=]/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (razaoSocial.length < 3) {
        let mensagem = 'razaoSocial invalido! Minimo 3 caracteres';
        return mostrarErro(mensagem);

    } else if (!emailRegex.test(email)) {
        let mensagem = "Email inválido!";
        return mostrarErro(mensagem);

    } else if (senha.length < 8 || !/[A-Z]/.test(senha)) {
        let mensagem = 'Senha invalida! Minimo de 8 caracteres e deve conter 1 caracter maiúsculo';
        return mostrarErro(mensagem);

    } else if (verificacao.some(campo => padrao.test(campo))) {
        let mensagem = 'Caracteres especiais são invalidos!'
        return mostrarErro(mensagem);

    } else {
        setTimeout(sumirMensagem, 7000);
    }

    try {
        const resposta = await fetch("/usuarios/update_register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                output_razaoSocial: razaoSocial,
                output_email: email,
                output_senha: senha,
                output_emailAntigo: emailAntigo
            }),
        });

        console.log("resposta: ", resposta.status);

        if (resposta.ok) {
            mensagem_erro.innerHTML = "Dados da conta atualizado com sucesso!";
            cardErro.style.display = "block";
            setTimeout(sumirMensagem(), 3000);

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

function carregarInformacoes() {
    var emailUsuarioSession = sessionStorage.email_ss;

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
        })
    })
        .then(resposta => {
            if (!resposta.ok) throw "Erro ao carregar informações";
            return resposta.json();
        })
        .then(dados => {
            console.log("Dados do usuário:", dados);

            // preenche inputs
            document.getElementById('razaoSocial_input').value = dados[0].razaoSocial;
            document.getElementById('email_input').value = dados[0].emailCorporativo;
            document.getElementById('b_usuario').innerHTML = dados[0].razaoSocial;

            // se tiver imagem
            if (dados[0].caminhoImagem) {
                document.getElementById("imagemUsuario").innerHTML = `
                    <img src="${dados[0].caminhoImagem}" alt="Imagem do Usuário">
                    <input type="file" id="foto" name="foto" hidden>
                    <label for="foto" class="upload" style="margin-top: 10px;">
                        Escolher imagem
                    </label>
                    <p id="mensagemImagemUsuario" style="margin-top: 10px; padding-bottom: 10px"></p>
                `;
            }
        })
        .catch(erro => {
            console.error(erro);
            alert("Não foi possível carregar as informações do usuário.");
        });
    // Corrige o erro de "window"
    window.onload = carregarInformacoes;
}