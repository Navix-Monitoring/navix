import { sumirMensagem, alerta } from '../sessao.js';

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

async function cadastrar() {
  const nome = nome_input.value;
  const sobrenome = sobrenome_input.value;
  const telefone = telefone_input.value;
  const email = email_input.value;
  const senha = senha_input.value;
  const codigo_empresa = codigo_input.value;

  const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const regexMaiuscula = /[A-Z]/;
  const regexNumero = /[0-9]/;

  if (nome === "") {
    return alerta("Erro", "O campo Nome não pode estar vazio", "error");
  } else if (sobrenome === "") {
    return alerta("Erro", "O campo Sobrenome não pode estar vazio", "error");
  } else if (telefone === "") {
    return alerta("Erro", "O campo Telefone não pode estar vazio", "error");
  } else if (telefone.length !== 11) {
    return alerta("Erro", "O telefone deve conter 11 dígitos (DDD + Número)", "error");
  } else if (email === "") {
    return alerta("Erro", "O campo Email não pode estar vazio", "error");
  } else if (!email.includes("@")) {
    return alerta("Erro", "O email deve conter um @", "error");
  } else if (senha === "") {
    return alerta("Erro", "O campo Senha não pode estar vazio", "error");
  } else if (senha.length < 6) {
    return alerta("Erro", "A senha deve ter pelo menos 6 caracteres", "error");
  } else if (!regexEspecial.test(senha)) {
    return alerta("Erro", "A senha deve conter pelo menos um caractere especial", "error");
  } else if (!regexMaiuscula.test(senha)) {
    return alerta("Erro", "A senha deve conter pelo menos uma letra maiúscula", "error");
  } else if (!regexNumero.test(senha)) {
    return alerta("Erro", "A senha deve conter pelo menos um número", "error");
  } else if (codigo_empresa === "") {
    return alerta("Erro", "O campo Código da Empresa não pode estar vazio", "error");
  }

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
      mostrarMensagem("sucesso", "Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location = "login.html";
      }, 3000);
    } else {
      if (resposta.status === 500) console.log(resposta.status);
      throw new Error("Erro ao cadastrar: " + resposta.status);
    }

  } catch (error) {
    return alerta("Erro", "Não foi possível conectar ao servidor", "error");
  } finally {
      
  }
}

window.cadastrar = cadastrar;
