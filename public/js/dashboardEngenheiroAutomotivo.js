let listaModelos;

function listarModelos() {
    modelos.innerHTML = `
     <div class="cabecalho">
     <p>Modelo</p>
     <p>Status</p>
     </p>Falhas detectadas</p>
     <p style="text-align: center;">Componentes <br>monitorados</p>
     <p>Taxa de falha</p>
     </div>
     `

    fetch(`/dashboard/listarModelos`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do listar modelos")

            listaModelos = json;
            for (let c = 0; c < listaModelos.length; c++) {
                modelos.innerHTML += `
                    <a href="../dashboard/loteQualidade.html" class="no-underline">
                        <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos hover:bg-blue-800 cursor-pointer">
                                 <p>Modelo: ${listaModelos[c].nome}</p>
                                <p>Status: ${listaModelos[c].status}</p>
                                <p>Falhas detectadas:</p>
                                 <p>Componentes Monitorados:</p>
                                 <p>Taxa de Falha:</p>
                            <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                            class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                Editar
                            </button>
                            <button onclick="event.stopPropagation();"
                            class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                Remover
                            </button>
                        </div>
                    </a>
`;
            }
        })
    })
}

function filtrar() {
    modelos.innerHTML = "";
    let busca = select_Status.value;
    if (busca != "#") {
        if (busca == "ati") {
            for (let c = 0; c < listaModelos.length; c++) {
                if (listaModelos[c].status == "Ativo") {
                    modelos.innerHTML +=
                        `
                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos">
                                <p>Modelo: ${listaModelos[c].nome}</p>
                                <p> Status: ${listaModelos[c].status}</p>
                                <p>Falhas detectadas:</p>
                                <p>Componentes Monitorados:</p>
                                <p>Taxa de Falha: </p> 
                                <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> 
                                <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                            </div>
                `
                }

            }
        }
        else if (busca == "des") {
            for (let c = 0; c < listaModelos.length; c++) {
                if (listaModelos[c].status == "Descontinuado") {
                    modelos.innerHTML +=
                        `
                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos"  onclick = "window.location.href = '../dashboard/loteQualidade.html'">
                                <p>Modelo: ${listaModelos[c].nome}</p>
                                <p> Status: ${listaModelos[c].status}</p>
                                <p>Falhas detectadas:</p>
                                <p>Componentes Monitorados:</p>
                                <p>Taxa de Falha: </p> 
                                <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> 
                                <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                            </div>
                `
                }

            }
        }
    } else {
        listarModelos();
    }
}
