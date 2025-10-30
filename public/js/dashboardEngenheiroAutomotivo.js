function listarLotes() {
    console.log("Estou na funcão listar lotes...")

    fetch(`/dashboard/listar/${sessionStorage.id_empresa_ss}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Entrei na resposta do fetch do listar lotes")
            const listaLotes = json;
            for (let c = 0; json.length > c; c++) {
                console.log("Entrei no listar lotes")
                if (c % 2 == 0) {
                    lotes.innerHTML +=
                        `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">
                        <div class="bg-black p-4 rounded-lg text-white cards-lotes"><p>Lote: ${listaLotes[c].codigo_lote}</p><p> Status: ${listaLotes[c].status}</p> <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button></div>
                       <a>
                        `
                }
                else {
                    lotes.innerHTML +=
                        `
                        <a href="lote.html" onclick="localStorage.setItem('lote', ${json[c].id})">

                            <div class="bg-blue-900 p-4 rounded-lg text-white cards-lotes"><p>Lote: ${listaLotes[c].codigo_lote}</p><p> Status: ${listaLotes[c].status}</p> <button onclick="buscarLote(${c + 1})" class="cursor-pointer w-150px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Editar</button> <button class="cursor-pointer w-30px bg-white border-2 border-blue-900 text-black rounded-md text-center py-2 hover:text-blue-900 hover:font-medium">Remover</button></div>
                        </a>
            `
                }

            }

        })
    })

}