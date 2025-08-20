async function deletar() {
    var confimar = confirmar_input.value;
    var email = sessionStorage.email_ss;
        
    if (!confimar || confimar != "CONFIRMO") {
        let mensagem = "Se deseja deletar a conta digite 'CONFIRMO'."
        return mostrarErro(mensagem);
    }

    try {
        const resposta = await fetch("/usuarios/remove_register", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                output_email: email
            }),
        });
        
        console.log("resposta: ", resposta.status);

        if (resposta.ok) {
            mensagem_erro.innerHTML = "Remoção conta realizado com sucesso! Redirecionando...";
            cardErro.style.display = "block";
            setTimeout(() => {
                window.location = "../index.html";
            }, 3000);
        
        }else {
            throw new Error("Erro ao deletar conta: " + resposta.status);
        }

    } catch (error) {
        return mostrarErro(error);
    }
}

async function atualizar() {
    
}