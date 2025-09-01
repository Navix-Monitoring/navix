import {mostrarErro, sumirMensagem} from '../sessao.js'

async function entrar() {

    var email = email_input.value;
    var senha = senha_input.value;
    const verificacao = [email, senha];
    const padrao = /["'!()\/\\|;\-\]\[{}=]/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !senha) {
        let mensagem = "Campos invalidos! Preencha email e senha.";
        return mostrarErro(mensagem);

    } else if (!emailRegex.test(email)) {
        let mensagem = "Email inválido!";
        return mostrarErro(mensagem);

    } else if (verificacao.some(campo => padrao.test(campo))) {
        let mensagem = 'Caracteres especiais são invalidos!';
        return mostrarErro(mensagem);

    }

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    try {
        const resposta = await fetch("usuarios/authentic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                output_email: email,
                output_senha: senha,
            }),
        });

        if (!resposta.ok) {
            if (json && json.erro === "email") {
                return mostrarErro("Email não cadastrado na base de dados!");
            } else if (json && json.erro === "senha") {
                return mostrarErro("Senha inválida!");
            } else if (json && json.erro === "preenchimento") {
                return mostrarErro("Preencha todos os campos!");
            } else {
                return mostrarErro("Erro ao fazer login!");
            }
        }

        const json = await resposta.json();

        // salvando dados
        
        if(json[0].emailCorporativo){
            sessionStorage.email_ss = json[0].emailCorporativo;
            sessionStorage.nome_ss = json[0].razaoSocial;
            sessionStorage.id_empresa = json[0].id_empresa;
            sessionStorage.tipo = 1;
        }else{
            sessionStorage.email_ss = json[0].email;
            sessionStorage.nome_ss = json[0].nome;
            sessionStorage.tipo = 0;
        }
        

        setTimeout(() => {
            window.location = "../perfil-visualizar.html" // arrumar aqui após criar as paginas
        }, 3000);

    } catch (error) {
        return mostrarErro(error);
    }
}

window.entrar = entrar; 