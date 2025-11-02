
var listaLotes;
function listarLotes() {
    console.log("Estou na função listarLotes...");
    var idsRegistrados = [];

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, { method: "GET" })
        .then(res => res.json())
        .then(json => {
            lotes.innerHTML = "";
            console.log("Entrei na resposta do fetch listar lotes");

            const listaLotes = json;

            for (let c = 0; c < listaLotes.length; c++) {
                const lote = listaLotes[c];
                const idLote = lote.idLote;

                // ✅ Se o id já foi adicionado, pula o loop
                if (idsRegistrados.includes(idLote)) continue;

                idsRegistrados.push(idLote);

                let modelo = lote.nomeModelo == null ? "N/A" : lote.nomeModelo;

                const corFundo = c % 2 === 0 ? "bg-black" : "bg-blue-900";

                lotes.innerHTML += `
                    <div class="${corFundo} p-4 rounded-lg text-white cards-lotes" 
                        onclick="abrirLote(${idLote})" 
                        style="cursor: pointer;">
                        <p>Lote: ${lote.codigo_lote}</p>
                        <p>Situação: ${lote.statusLote}</p>
                        <p>Modelo: ${modelo}</p>
                        <p>Status:</p>
                        <div class="bolinha"></div>

                        <div class="botoes">
                            <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                                class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                Editar
                            </button>

                            <button onclick="event.stopPropagation(); removerLote(${idLote})"
                                class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                Remover
                            </button>
                        </div>
                    </div>
                `;
            }

            listarModelos();
        })
        .catch(err => console.error("Erro ao listar lotes:", err));
}

function abrirLote(idLote) {
  localStorage.setItem('lote', idLote);
  window.location = "lote.html";
}

function filtrarModelo() {
    var filtroModelo = select_modelo.value;
    if (filtroModelo == "#") {
        listarLotes();
    } else {


        fetch(`/dashboard/filtroModelo/${filtroModelo}`, {
            method: "GET"
        }).then(res => {
            res.json().then(json => {
                console.log("Entrei na resposta do fetch do filtrar modelos")
                listaLotes = json;
                lotes.innerHTML = ""
                for (let c = 0; c < listaLotes.length; c++) {
                    let modelo = listaLotes[c].nomeModelo == null ? "N/A" : listaLotes[c].nomeModelo
                    lotes.innerHTML +=
                        `
               <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes" onclick="abrirLote(${json[c].idLote})" style="cursor: pointer;">
                        <p>Lote: ${listaLotes[c].codigo_lote}</p>
                        <p>Situação: ${listaLotes[c].statusLote}</p>
                        <p>Modelo: ${modelo}</p>
                        <p>Status:</p>
                        <div class="bolinha"></div>

                        <div class="botoes">
                            <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                            class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                            Editar
                            </button>

                            <button onclick="event.stopPropagation(); removerLote(${json[c].idLote})"
                            class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                            Remover
                            </button>
                        </div>
                    </div>
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

function listarModelos() {
    fetch(`/dashboard/listarModelos`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do listar modelos")

            modelos = json;
            select_modelo.innerHTML = "<option value='#'>Selecione</option>"
            for (let c = 0; c < modelos.length; c++) {
                select_modelo.innerHTML +=
                    `
                <option value="${c + 1}">${modelos[c].nome}</option>
                `
            }
        })
    })

}

function filtrar() {
    const filtroStatus = select_Status.value;
    const idsRegistrados = [];

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, { method: "GET" })
        .then(res => res.json())
        .then(json => {
            const listaLotes = json;
            lotes.innerHTML = "";

            if (filtroStatus === "#") {
                listarLotes();
                return;
            }

            let statusDesejado = "";
            if (filtroStatus === "ati") statusDesejado = "Ativo";
            else if (filtroStatus === "man") statusDesejado = "Manutenção";
            else if (filtroStatus === "ina") statusDesejado = "Inativo";

            for (let c = 0; c < listaLotes.length; c++) {
                const lote = listaLotes[c];
                const idLote = lote.idLote;

                // Evita duplicados
                if (idsRegistrados.includes(idLote)) continue;
                idsRegistrados.push(idLote);

                if (lote.statusLote === statusDesejado) {
                    const modelo = lote.nomeModelo == null ? "N/A" : lote.nomeModelo;
                    const corFundo =  "bg-blue-900";

                    lotes.innerHTML += `
                        <div class="${corFundo} p-4 rounded-lg text-white cards-lotes" 
                            onclick="abrirLote(${idLote})" style="cursor: pointer;">
                            <p>Lote: ${lote.codigo_lote}</p>
                            <p>Situação: ${lote.statusLote}</p>
                            <p>Modelo: ${modelo}</p>
                            <p>Status:</p>
                            <div class="bolinha"></div>

                            <div class="botoes">
                                <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                                    class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Editar
                                </button>

                                <button onclick="event.stopPropagation(); removerLote(${idLote})"
                                    class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Remover
                                </button>
                            </div>
                        </div>
                    `;
                }
            }
        })
        .catch(err => console.error("Erro no filtro:", err));
}


function pesquisar() {
    const conteudo = ipt_pesquisa.value.trim().toLowerCase();
    const idsRegistrados = [];

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, { method: "GET" })
        .then(res => res.json())
        .then(json => {
            const listaLotes = json;
            lotes.innerHTML = "";

            if (conteudo === "") {
                listarLotes();
                return;
            }

            for (let c = 0; c < listaLotes.length; c++) {
                const lote = listaLotes[c];
                const idLote = lote.idLote;

                // Evita duplicados
                if (idsRegistrados.includes(idLote)) continue;
                idsRegistrados.push(idLote);

                const modelo = lote.nomeModelo == null ? "N/A" : lote.nomeModelo;

                // Pesquisa por nome do modelo ou código do lote
                const codigo = lote.codigo_lote?.toLowerCase() || "";
                const nomeModelo = lote.nomeModelo?.toLowerCase() || "";

                if (codigo.includes(conteudo) || nomeModelo.includes(conteudo)) {
                    const corFundo = c % 2 === 0 ? "bg-black" : "bg-blue-900";

                    lotes.innerHTML += `
                        <div class="${corFundo} p-4 rounded-lg text-white cards-lotes" 
                            onclick="abrirLote(${idLote})" style="cursor: pointer;">
                            <p>Lote: ${lote.codigo_lote}</p>
                            <p>Situação: ${lote.statusLote}</p>
                            <p>Modelo: ${modelo}</p>
                            <p>Status:</p>
                            <div class="bolinha"></div>

                            <div class="botoes">
                                <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                                    class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Editar
                                </button>

                                <button onclick="event.stopPropagation(); removerLote(${idLote})"
                                    class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Remover
                                </button>
                            </div>
                        </div>
                    `;
                }
            }
        })
        .catch(err => console.error("Erro na pesquisa:", err));
}

function filtrarPorData() {
    const dataSelecionada = document.getElementById("data").value;
    const idsRegistrados = [];

    if (!dataSelecionada) {
        listarLotes(); 
        return;
    }

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, { method: "GET" })
        .then(res => res.json())
        .then(json => {
            const listaLotes = json;
            lotes.innerHTML = "";

            // Normaliza a data selecionada
            const dataFiltro = new Date(dataSelecionada).toISOString().split("T")[0];

            for (let c = 0; c < listaLotes.length; c++) {
                const lote = listaLotes[c];
                const idLote = lote.idLote;

                // Evita duplicados
                if (idsRegistrados.includes(idLote)) continue;
                idsRegistrados.push(idLote);

                // Normaliza a data do lote
                const dataLote = new Date(lote.data_fabricacao).toISOString().split("T")[0];

                // Se as datas coincidirem
                if (dataLote === dataFiltro) {
                    const modelo = lote.nomeModelo == null ? "N/A" : lote.nomeModelo;
                    const corFundo = c % 2 === 0 ? "bg-black" : "bg-blue-900";

                    lotes.innerHTML += `
                        <div class="${corFundo} p-4 rounded-lg text-white cards-lotes"
                            onclick="abrirLote(${idLote})" style="cursor: pointer;">
                            <p>Lote: ${lote.codigo_lote}</p>
                            <p>Situação: ${lote.statusLote}</p>
                            <p>Modelo: ${modelo}</p>
                            <p>Data de fabricação: ${dataLote}</p>
                            <p>Status:</p>
                            <div class="bolinha"></div>

                            <div class="botoes">
                                <button onclick="event.stopPropagation(); buscarLote(${c + 1})"
                                    class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Editar
                                </button>

                                <button onclick="event.stopPropagation(); removerLote(${idLote})"
                                    class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">
                                    Remover
                                </button>
                            </div>
                        </div>
                    `;
                }
            }

            // Se nada foi encontrado
            if (lotes.innerHTML === "") {
                lotes.innerHTML = `<p class="text-gray-500 mt-4">Nenhum lote encontrado para essa data.</p>`;
            }
        })
        .catch(err => console.error("Erro ao filtrar por data:", err));
}
