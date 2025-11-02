const idLote = localStorage.lote;
console.log(idLote)

function carregarInformacoes() {

    fetch(`/dashboard/buscarLote/${idLote}`, {
        method: "GET"
    }).then(res => {
        res.json().then(json => {
            console.log("Carregando as informações do lote...")
            console.log(json)
            console.log(json[0].fkLote)
            console.log(json[0].total_veiculos)
            qtdCarros = json[0].total_veiculos == null? 0 : json[0].total_veiculos

            tituloLote.innerHTML = `Lote: ${json[0].codigo_lote} - ${qtdCarros} carros`
        })
    })
}

function simularValores() {
    var numeroRandom1 = Math.random() * 99 + 1;
    var numeroRandom2 = Math.random() * 99 + 1;
    var numeroRandom3 = Math.random() * 149 + 1;
    var numeroRandom4 = Math.random() * 499 + 1;
    var numeroRandom5 = Math.random() * 99 + 1;

    var simulacaoCPU = Math.round(numeroRandom1);
    var simulacaoDISCO = Math.round(numeroRandom2);
    var simulacaoTemperatura = Math.round(numeroRandom3);
    var simulacaoProcessos = Math.round(numeroRandom4);
    var simulacaoBateria = Math.round(numeroRandom5);

    NumeroKPICPU.innerHTML = simulacaoCPU + "%";
    NumeroKPIDISCO.innerHTML = simulacaoDISCO + "%";
    NumeroKPITEMPERATURA.innerHTML = simulacaoTemperatura + "°";
    NumeroKPIPROCESSOS.innerHTML = simulacaoProcessos + "";
    NumeroKPIBATERIA.innerHTML = simulacaoBateria + "";

    if (simulacaoCPU != null || simulacaoCPU > 0) {
        if (simulacaoCPU>0 && simulacaoCPU <= 65) {
            tipoRiscoCPU.innerHTML = `Risco BAIXO`
            cpuColour.style = "border-color: green";
        }
        else if (simulacaoCPU> 65 && simulacaoCPU <= 80) {
            tipoRiscoCPU.innerHTML = `Risco MODERADO`
            cpuColour.style = "border-color: yellow";
        }
        else if (simulacaoCPU > 80 && simulacaoCPU <= 100) {
            tipoRiscoCPU.innerHTML = `Risco ALTO`
            cpuColour.style = "border-color: red";
        }
    }
    if (simulacaoDISCO != null || simulacaoDISCO > 0) {
        if (simulacaoCPU>0 && simulacaoDISCO <= 65) {
            tipoRiscoDISCO.innerHTML = `Risco BAIXO`
            discoColour.style = "border-color: green";
        }
        else if (simulacaoDISCO >65 && simulacaoDISCO <= 80) {
            tipoRiscoDISCO.innerHTML = `Risco MODERADO`
            discoColour.style = "border-color: yellow";
        }
        else if (simulacaoDISCO>80 && simulacaoDISCO <= 100) {
            tipoRiscoDISCO.innerHTML = `Risco ALTO`
            discoColour.style = "border-color: red";
        }
    }

    if (simulacaoTemperatura != null || simulacaoTemperatura > 0) {
        if (simulacaoTemperatura > 0 && simulacaoTemperatura <= 65) {
            tipoRiscoTEMPERATURA.innerHTML = `Risco BAIXO`
            temperaturaColour.style = "border-color: green";
        }
        else if (simulacaoTemperatura > 65 && simulacaoTemperatura <= 90) {
            tipoRiscoTEMPERATURA.innerHTML = `Risco MODERADO`
            temperaturaColour.style = "border-color: yellow";
        }
        else if (simulacaoTemperatura >90 && simulacaoTemperatura <= 150) {
            tipoRiscoTEMPERATURA.innerHTML = `Risco ALTO`
            temperaturaColour.style = "border-color: red";
        }
    }

     if (simulacaoProcessos != null || simulacaoProcessos > 0) {
        if (simulacaoProcessos > 0 && simulacaoProcessos <= 250) {
            tipoRiscoPROCESSOS.innerHTML = `Risco BAIXO`
            processosColour.style = "border-color: green";
        }
        else if (simulacaoProcessos > 250 && simulacaoProcessos <= 350) {
            tipoRiscoPROCESSOS.innerHTML = `Risco MODERADO`
            processosColour.style = "border-color: yellow";
        }
        else if (simulacaoProcessos >350 && simulacaoProcessos <= 500) {
            tipoRiscoPROCESSOS.innerHTML = `Risco ALTO`
            processosColour.style = "border-color: red";
        }
    }


    if (simulacaoBateria != null || simulacaoBateria > 0) {
        if (simulacaoBateria > 0 && simulacaoBateria <= 65) {
            tipoRiscoBATERIA.innerHTML = `Risco BAIXO`;
            bateriaColour.style = "border-color: green";
        }
        else if (simulacaoBateria > 65 && simulacaoBateria <= 80) {
            tipoRiscoBATERIA.innerHTML = `Risco MODERADO`;
            bateriaColour.style = "border-color: yellow";
        }
        else if (simulacaoBateria > 80 && simulacaoBateria <= 100) {
            tipoRiscoBATERIA.innerHTML = `Risco ALTO`;
            bateriaColour.style = "border-color: red";
        }
    }
}