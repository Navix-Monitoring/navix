import { sumirMensagem } from '../sessao.js';

function mostrarMensagem(tipo, texto) {
  const card = document.getElementById("cardMensagem");
  const mensagem = document.getElementById("mensagem_status");

  mensagem.textContent = texto;

  card.className = "px-4 py-3 rounded mb-4";

  if (tipo === "sucesso") {
    card.classList.add("bg-green-200", "text-green-800");
  } else {
    card.classList.add("bg-red-200", "text-red-800");
  }

  card.classList.remove("hidden");
  setTimeout(sumirMensagem, 7000);
}

function mostrarLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

function esconderLoading() {
  document.getElementById('loading').classList.add('hidden');
}

async function cadastrar() {
  var razaoSocial = razaoSocial_input.value;
  var email = email_input.value;
  var senha = senha_input.value;
  var confirmarSenha = confirmar_senha_input.value;
  var cnpj = cnpj_input.value;

  const verificacao = [razaoSocial, email, senha, confirmarSenha, cnpj];
  const padrao = /["'!()\/\\|;\-\]\[{}=]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (verificacao.includes("")) {
    esconderLoading();
    return mostrarMensagem("erro", "Campos inválidos! Deve-se preencher todos os campos");
  } else if (razaoSocial.length < 3) {
    esconderLoading();
    return mostrarMensagem("erro", "Razão social inválida! Mínimo 3 caracteres");
  } else if (!/^\d{14}$/.test(cnpj)) {
    esconderLoading();
    return mostrarMensagem("erro", "CNPJ inválido! Deve conter exatamente 14 dígitos numéricos.");
  } else if (!emailRegex.test(email)) {
    esconderLoading();
    return mostrarMensagem("erro", "Email inválido!");
  } else if (senha.length < 8 || !/[A-Z]/.test(senha)) {
    esconderLoading();
    return mostrarMensagem("erro", "Senha inválida! Mínimo de 8 caracteres e pelo menos 1 maiúsculo");
  } else if (senha !== confirmarSenha) {
    esconderLoading();
    return mostrarMensagem("erro", "Senha inválida! As senhas estão diferentes.");
  } else if (verificacao.some(campo => padrao.test(campo))) {
    esconderLoading();
    return mostrarMensagem("erro", "Caracteres especiais são inválidos!");
  }

  try {
    const resposta = await fetch("/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        output_razaoSocial: razaoSocial,
        output_cnpj: cnpj,
        output_email: email,
        output_senha: senha,
      }),
    });

    console.log("resposta: ", resposta.status);

    if (resposta.ok) {
      mostrarLoading();
      mostrarMensagem("sucesso", "Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location = "login.html";
      }, 3000);
    } else {
      esconderLoading();
      if(resposta.status == 500) {
        console.log(resposta.status)
      }
      throw new Error("Erro ao cadastrar: " + resposta.status);
    }

  } catch (error) {
    esconderLoading();
    return mostrarMensagem("erro", error.message || "Erro inesperado ao cadastrar");
  }
}

window.cadastrar = cadastrar;
