async function entrar() {
    aguardar();

    var email = email_input.value;
    var senha = senha_input.value;

    if (!email || !senha) {
        let mensagem = "Campos invalidos! Preencha email e senha.";
        return mostrarErro(mensagem);
    }

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    try {
        const resposta = await fetch("usuarios/authentic", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                output_email: email,
                output_senha: senha,
            }),
        });

        if (!resposta.ok) {
            throw new Error("Erro ao fazer login: " + resposta.status);
        }

        const json = await resposta.json();

        // salvando dados
        sessionStorage.email_ss = json.email;
        sessionStorage.nome_ss = json.nome;

        setTimeout(() => {
            window.location = "./" // arrumar aqui após criar as paginas
        }, 3000);

    } catch (error) {
        return mostrarErro(error);
    }
}