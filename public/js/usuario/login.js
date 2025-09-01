import { mostrarErro, sumirMensagem } from '../sessao.js';

function mostrarLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function esconderLoading() {
    document.getElementById('loading').classList.add('hidden');
}

async function entrar() {
    const email = email_input.value;
    const senha = senha_input.value;

    mostrarLoading();

    const verificacao = [email, senha];
    const padrao = /["'!()\/\\|;\-\]\[{}=]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        
        if (!email || !senha) {
            esconderLoading();
            return mostrarErro("Campos inválidos! Preencha email e senha.");
        } 
        if (!emailRegex.test(email)) {
            esconderLoading();
            return mostrarErro("Email inválido!");
        } 
        if (verificacao.some(campo => padrao.test(campo))) {
            esconderLoading();
            return mostrarErro("Caracteres especiais são inválidos!");
        }

        const resposta = await fetch("usuarios/authentic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                output_email: email,
                output_senha: senha
            })
        });

        let json;
        try {
            json = await resposta.json();
        } catch (e) {
            json = null;
        }

        if (!resposta.ok) {
            esconderLoading();
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

        // Salvando dados no sessionStorage
        if (json[0].emailCorporativo) {
            sessionStorage.email_ss = json[0].emailCorporativo;
            sessionStorage.nome_ss = json[0].razaoSocial;
            sessionStorage.id_empresa = json[0].id_empresa;
            sessionStorage.cnpj = json[0].cnpj;
            sessionStorage.tipo = 1;
        } else {
            sessionStorage.email_ss = json[0].email;
            sessionStorage.nome_ss = json[0].nome;
            sessionStorage.tipo = 0;
        }

        // Redirecionamento após 3 segundos
        setTimeout(() => {
            esconderLoading();
            window.location = "../perfil-visualizar.html";
        }, 3000);

    } catch (error) {
        esconderLoading();
        return mostrarErro("Não foi possível conectar ao servidor.");
    }
}

window.entrar = entrar;
