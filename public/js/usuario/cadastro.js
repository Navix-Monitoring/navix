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
  var nome = nome_input.value;
  var sobrenome = sobrenome_input.value;
  var telefone = telefone_input.value;
  var email = email_input.value;
  var senha = senha_input.value;
  var codigo_empresa = codigo_input.value;

  try {
    const resposta = await fetch("/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomeServer: nome,
        sobrenomeServer: sobrenome,
        telefoneServer: telefone,
        emailServer: email,
        senhaServer: senha,
        codigo_empresaServer: codigo_empresa
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
