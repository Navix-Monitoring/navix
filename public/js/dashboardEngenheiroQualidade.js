
var listaLotes;
function listarLotes() {
    console.log("Estou na funcão listar lotes...")

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            lotes.innerHTML = ""
            console.log("Entrei na resposta do fetch do listar lotes")
            const listaLotes = json;
            for (let c = 0; json.length > c; c++) {
                let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                console.log("Entrei no listar lotes")
                if (c % 2 == 0) {
                    lotes.innerHTML += 
                        `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].idLote})">
                        <div class="bg-black p-4 rounded-lg text-white cards-lotes">
                            <p>Lote: ${listaLotes[c].codigo_lote}</p>
                            <p> Situação: ${listaLotes[c].statusLote}</p>
                            <p> Modelo: ${modelo}</p>
                            <p>Status: </p><div class="bolinha"></div>
                            <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> 
                            <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                        </div>
                       <a>
                        `
                }
                else {
                    lotes.innerHTML +=
                        `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].idLote})">
                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                                <p>Lote: ${listaLotes[c].codigo_lote}</p>
                                <p> Situação: ${listaLotes[c].statusLote}</p>
                                <p> Modelo: ${modelo}</p>
                                <p>Status: </p><div class="bolinha"></div>
                                <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                                <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                            </div>
                        </a>
                        `
                }

            }

        })
    })
    listarModelos();

}

function filtrarModelo(){
     var filtroModelo = select_modelo.value;
    if(filtroModelo == "#"){
        listarLotes();
    }else{

   
    fetch(`/dashboard/filtroModelo/${filtroModelo}`,{
        method: "GET"
    }).then(res=>{
        res.json().then(json=>{
            console.log("Entrei na resposta do fetch do filtrar modelos")
            listaLotes = json;
             lotes.innerHTML = ""
            for(let c = 0; c<listaLotes.length;c++){
                let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                 lotes.innerHTML += 
                `
               <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">
                    <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                        <p>Lote: ${listaLotes[c].codigo_lote}</p>
                        <p> Situação: ${listaLotes[c].statusLote}</p>
                        <p> Modelo: ${modelo}</p>
                        <p>Status: </p><div class="bolinha"></div>
                        <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                        <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                    </div>
                </a>
                `
            }
        })
    })
    }

}

function buscarLote(idLote) {

    fetch(`/dashboard/buscarLote/${idLote}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do buscar lote")
            const dataFabricacao = new Date(json[0].data_fabricacao);

            // Formata no padrão dd/mm/yyyy
            const dia = String(dataFabricacao.getDate()).padStart(2, '0');
            const mes = String(dataFabricacao.getMonth() + 1).padStart(2, '0'); // meses começam do 0
            const ano = dataFabricacao.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            criarEditar.innerHTML =
                `
                <dialog id="lote${idLote}" >
                <h1>Lote: ${json[0].codigo_lote}</h1>
                <h3>Data de fabricação: ${dataFormatada}<h3>
                <h3>Quantidade de veiculos: ${json[0].qtd_veiculos}</h3>
                </dialog>
                `

            const dialog = document.getElementById(`lote${idLote}`);
            if (dialog) {
                dialog.showModal();
            } else {
                console.error("Dialog não encontrado!");
            }
        })
    })

        .catch(erro => console.error("Erro ao buscar lote:", erro));

}

function listarModelos(){
    fetch(`/dashboard/listarModelos`,{
        method: "GET"
    }).then(res=>{
        res.json().then(json =>{
            console.log("Entrei na resposta do fetch do listar modelos")

            modelos = json;
            select_modelo.innerHTML ="<option value='#'>Selecione</option>"
            for(let c = 0; c<modelos.length;c++){
                select_modelo.innerHTML += 
                `
                <option value="${c+1}">${modelos[c].nome}</option>
                `
            }
        })
    })

}

function filtrar() {
    var filtroStatus = select_Status.value;
    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do filtrar lotes")
            const listaLotes = json;
            if (filtroStatus != "#") {
                console.log("Passou no if de filtro por #")
                if (filtroStatus == "ati") {
                    lotes.innerHTML = ""
                    console.log("Entrou no filtrar ativo")
                    for (let c = 0; c < listaLotes.length; c++) {
                        let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                        console.log("Entrei no for filtrar ativos")
                        if (listaLotes[c].statusLote == "Ativo") {
                            lotes.innerHTML +=
                                
                            `
                            <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">
                                <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                                    <p>Lote: ${listaLotes[c].codigo_lote}</p>
                                    <p> Situação: ${listaLotes[c].statusLote}</p>
                                    <p> Modelo: ${modelo}</p>
                                    <p>Status: </p><div class="bolinha"></div>
                                    <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                                    <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                                </div>
                            </a>
                        
                                `
                        }
                    }
                }
                else if (filtroStatus == "man") {
                    lotes.innerHTML = ""
                    console.log("Entrou no filtrar ativo")
                    for (let c = 0; c < listaLotes.length; c++) {
                        let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                        console.log("Entrei no for filtrar ativos")
                        if (listaLotes[c].statusLote == "Manutenção") {
                            lotes.innerHTML +=
                                `
                            <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">
                                <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                                    <p>Lote: ${listaLotes[c].codigo_lote}</p>
                                    <p> Situação: ${listaLotes[c].statusLote}</p>
                                    <p> Modelo: ${modelo}</p>
                                    <p>Status: </p><div class="bolinha"></div>
                                    <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                                    <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                                </div>
                            </a>
                                `
                        }
                    }
                }
                else if (filtroStatus == "ina") {
                    lotes.innerHTML = ""
                    console.log("Entrou no filtrar ativo")
                    for (let c = 0; c < listaLotes.length; c++) {
                        let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                        console.log("Entrei no for filtrar ativos")
                        if (listaLotes[c].statusLote == "Inativo") {
                            lotes.innerHTML +=
                                `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">
                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                                <p>Lote: ${listaLotes[c].codigo_lote}</p>
                                <p> Situação: ${listaLotes[c].statusLote}</p>
                                <p> Modelo: ${modelo}</p>
                                <p>Status: </p><div class="bolinha"></div>
                                <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                                <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                            </div>
                                </a>
                                `
                        }
                    }
                }
            } else {
                listarLotes();
            }

        })
    })


}

function pesquisar(){
    let conteudo = ipt_pesquisa.value;

      fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            lotes.innerHTML = ""
            console.log("Entrei na resposta do fetch do listar lotes")
            const listaLotes = json;
            if(conteudo != ""){
                for (let c = 0; json.length > c; c++) {
                let modelo = listaLotes[c].nomeModelo == null? "N/A": listaLotes[c].nomeModelo
                console.log("Entrei no listar lotes")
                if (listaLotes[c].codigo_lote.toLowerCase().includes(conteudo.toLowerCase()) || listaLotes[c].nomeModelo.toLowerCase().includes(conteudo.toLowerCase()) ) {
                    lotes.innerHTML += 
                        `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].idLote})">
                        <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes">
                            <p>Lote: ${listaLotes[c].codigo_lote}</p>
                            <p> Situação: ${listaLotes[c].statusLote}</p>
                            <p> Modelo: ${modelo}</p>
                            <p>Status: </p><div class="bolinha"></div>
                            <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> 
                            <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                        </div>
                       <a>
                        `
                }
            }
            }else{
                listarLotes()
            }
            

        })
    })

}