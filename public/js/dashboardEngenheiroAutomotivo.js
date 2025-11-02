var listaModelos;

function listarModelos() {
    fetch(`/dashboard/listarModelos`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            modelos.innerHTML = `
                <div class="cabecalho">
                    <p>Modelo</p>
                    <p>Status</p>
                    <p>Falhas detectadas</p>
                    <p>Componentes monitorados</p>
                    <p>Taxa de falha</p>
                </div>
            `;
            console.log("Entrei na resposta do fetch do listar modelos");
            listaModelos = json;
            for (let c = 0; c < listaModelos.length; c++) {
                modelos.innerHTML += `
                <a href="hardware.html" onclick="localStorage.setItem('lote', ${json[c].idLote})">
                    <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos">
                        <p>${listaModelos[c].nome}</p>
                        <p>${listaModelos[c].status}</p>
                        <p>223</p>
                        <p>3</p>
                        <p>2%</p>
                        <button onclick="buscarModelo(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                        <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                    </div>
                </a>
                `;
            }
        });
    });
}

function filtrarModelos() {
    modelos.innerHTML = "";
    let filtroStatus = select_Status.value;
    if (filtroStatus != "#") {
        for (let c = 0; c < listaModelos.length; c++) {
            if (listaModelos[c].status == filtroStatus) {
                modelos.innerHTML += `
                <a href="hardware.html" onclick="localStorage.setItem('lote', ${json[c].idLote})">
                    <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos">
                        <p>Modelo: ${listaModelos[c].nome}</p>
                        <p>Status: ${listaModelos[c].status}</p>
                        <p>Falhas detectadas: 223</p>
                        <p>Componentes Monitorados: 3</p>
                        <p>Taxa de Falha: 2%</p>
                        <button onclick="buscarModelo(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                        <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                    </div>
                </a>
                `;
            }
        }
    } else {
        listarModelos();
    }
}

function buscarModelo(idModelo) {
    fetch(`/dashboard/buscarModelo/${idModelo}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do buscar modelo");
            const dataFabricacao = new Date(json[0].data_fabricacao);

            // Formata no padrão dd/mm/yyyy
            const dia = String(dataFabricacao.getDate()).padStart(2, '0');
            const mes = String(dataFabricacao.getMonth() + 1).padStart(2, '0');
            const ano = dataFabricacao.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            criarEditar.innerHTML = `
                <dialog id="modelo${idModelo}">
                    <h1>Modelo: ${json[0].nome}</h1>
                    <h3>Data de fabricação: ${dataFormatada}</h3>
                    <h3>Quantidade de veículos: ${json[0].qtd_veiculos}</h3>
                </dialog>
            `;

            const dialog = document.getElementById(`modelo${idModelo}`);
            if (dialog) {
                dialog.showModal();
            } else {
                console.error("Dialog não encontrado!");
            }
        });
    }).catch(erro => console.error("Erro ao buscar modelo:", erro));
}

function pesquisarModelo() {
    let conteudo = ipt_pesquisa.value;

    fetch(`/dashboard/listarModelos`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            modelos.innerHTML = "";
            if (conteudo != "") {
                for (let c = 0; c < json.length; c++) {
                    if (json[c].nome.toLowerCase().includes(conteudo.toLowerCase())) {
                        modelos.innerHTML += `
                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-modelos">
                                <p>${json[c].nome}</p>
                                <p>${json[c].status}</p>
                                <p>223</p>
                                <p>3</p>
                                <p>2%</p>
                                <button onclick="buscarModelo(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button>
                                <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button>
                            </div>
                        `;
                    }
                }
            } else {
                listarModelos();
            }
        });
    });
}
