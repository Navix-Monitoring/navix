import {mostrarErro, sumirMensagem} from '../sessao.js'

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
  const padrao = /["'!()\/\\|;\-\]\[{}=]/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (verificacao.includes("")) {
    esconderLoading();
    let mensagem = "Campos invalidos! Deve-se preencher todos os campos";
    return mostrarErro(mensagem);

  } else if (razaoSocial.length < 3) {
    esconderLoading();
    let mensagem = 'razaoSocial invalido! Minimo 3 caracteres';
    return mostrarErro(mensagem);

  } else if (!/^\d{14}$/.test(cnpj)) {
    esconderLoading();
    let mensagem = "CNPJ inválido! Deve conter exatamente 14 dígitos numéricos.";
    return mostrarErro(mensagem);

  } else if (!emailRegex.test(email)) {
    esconderLoading();
    let mensagem = "Email inválido!";
    return mostrarErro(mensagem);

  } else if (senha.length < 8 || !/[A-Z]/.test(senha)) {
    esconderLoading();
    let mensagem = 'Senha invalida! Minimo de 8 caracteres e deve conter 1 caracter maiúsculo';
    return mostrarErro(mensagem);

  } else if (senha != confirmarSenha) {
    esconderLoading();
    let mensagem = 'Senha invalida! senhas estão diferentes!';
    return mostrarErro(mensagem);

  } else if (verificacao.some(campo => padrao.test(campo))) {
    esconderLoading();
    let mensagem = 'Caracteres especiais são invalidos!'
    return mostrarErro(mensagem);

  } else {
    setTimeout(sumirMensagem, 7000);
  }

  try {
    const resposta = await fetch("/usuarios/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
      cardErro.style.display = "block";
      setTimeout(() => {
        window.location = "login.html";
      }, 3000);

    } else {
      esconderLoading();
      throw new Error("Erro ao cadastrar: " + resposta.status);
    }

  } catch (error) {
    return mostrarErro(error);
  }
}

window.cadastrar = cadastrar;
