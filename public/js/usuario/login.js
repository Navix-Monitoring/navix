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

        const resposta = await fetch("usuarios/autenticar", {
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
        console.log(json)

        if (!resposta.ok) {
            esconderLoading();
            const textoErro = resposta.text();
            console.error("Erro do servidor:", textoErro);
            return mostrarErro("Email e/ou senha inválido(s)");
        }

        // Salvando dados no sessionStorage
            sessionStorage.email_ss = json.email;
            sessionStorage.nome_ss = json.nome;
            sessionStorage.imagem = json.caminhoImagem

        // Redirecionamento após 3 segundos
        mostrarLoading();
        setTimeout(() => {
            esconderLoading();
            window.location = "../admin.html";
        }, 3000);

    } catch (error) {
        esconderLoading();
        return mostrarErro("Não foi possível conectar ao servidor.");
    }
}

window.entrar = entrar;
