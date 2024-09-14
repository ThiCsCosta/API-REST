function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criarLinha(lista){
    linha = document.createElement("tr")
    tdId = document.createElement("td")
    tdSelecao = document.createElement("td")
    tdGrupo = document.createElement("td")
    tdId.innerHTML = lista.id
    tdSelecao.innerHTML = lista.selecao
    tdGrupo.innerHTML = lista.grupo

    linha.appendChild(tdId)
    linha.appendChild(tdSelecao)
    linha.appendChild(tdGrupo)

    return linha
}

function indice(){
    let listas = fazGet("http://localhost:3000/")
    let listaSelecoes = JSON.parse(listas)
    

    let tabela = document.getElementById("tabela")
    listaSelecoes.forEach(element => {
        let linhas = criarLinha(element)
        tabela.appendChild(linha)
    });
}

indice()