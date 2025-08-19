
async function cadastrar() {
  aguardar();

  var razaoSocial = razaoSocial_input.value;
  var email = email_input.value;
  var senha = senha_input.value;
  var confirmarSenha = confirmar_senha_input.value;
  var cnpj = cnpj_input.value;
  const verificacao = [razaoSocial, email, senha, confirmarSenha, cnpj];
  const padrao = /["'!()\/\\|;\-\]\[{}=]/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (verificacao.includes("")) {
    let mensagem = "Campos invalidos! Deve-se preencher todos os campos";
    return mostrarErro(mensagem);

  } else if (razaoSocial.length < 3) {
    let mensagem = 'razaoSocial invalido! Minimo 3 caracteres';
    return mostrarErro(mensagem);

  } else if (!/^\d{14}$/.test(cnpj)) {
    let mensagem = "CNPJ inválido! Deve conter exatamente 14 dígitos numéricos.";
    return mostrarErro(mensagem);

  } else if (!emailRegex.teste(email)) {
    let mensagem = "Email inválido!";
    return mostrarErro(mensagem);

  } else if (senha.length < 8 || !/[A-Z]/.test(senha)) {
    let mensagem = 'Senha invalida! Minimo de 8 caracteres e deve conter 1 caracter maiúsculo';
    return mostrarErro(mensagem);

  } else if (senha != confirmarSenha) {
    let mensagem = 'Senha invalida! senhas estão diferentes!';
    return mostrarErro(mensagem);

  } else if (verificacao.some(campo => padrao.test(campo))) {
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
      mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
      cardErro.style.display = "block";
      setTimeout(() => {
        window.location = "login.html";
      }, 3000);
    } else {
      let mensagem = "Erro ao cadastrar: " + resposta.status;
      return mostrarErro(mensagem);

    }
  } catch (error) {
    console.log("Erro na requisição: ", error);
    let mensagem = "Erro inesperado ao tentar realizar o cadastro";
    return mostrarErro(mensagem);
  }
}

function sumirMensagem() {
  cardErro.style.display = "none";
}

function mostrarErro(mensagem) {
  cardErro.style.display = "flex";
  mensagem_erro.innerHTML = mensagem;
  setTimeout(() => {
    finalizarAguardar();
  }, 3000);
}