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


window.cadastrar_empresa = cadastrar_empresa;