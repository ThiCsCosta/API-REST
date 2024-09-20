import express, { Router } from 'express';  // <-- import express
import { SlowBuffer } from 'node:buffer';
const app = express(); // <-- criar uma instancia do express
import * as fs from 'node:fs';


function numberRandom(){
    const generateNumbersRandom = 1000
    const number = parseInt(Math.random() * generateNumbersRandom + 1)
    return number
}

app.use(express.json({extended: true})) // <-- indica para o express ler arquivos JSON
app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
})


const readFile = () =>{
    const content = fs.readFileSync('./db/db.json', 'utf-8')
    return JSON.parse(content)
}
const writeFile = (content) =>{
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./db/db.json', updateFile, 'utf-8')
}

//Retorna todos os elementos
const seacherId = readFile()
function seachId(id){
    return seacherId.filter(seacherId => seacherId.id == id)
}

//Buscar a posição do elemento do index no array
function buscarFilterIndex(id){
    return seacherId.findIndex(seacherId => seacherId.id == id)
}
// criando rota padrão ou raiz
//Lendo
app.get('/', (req, res) => {
    res.send(readFile())
})
// Busca por id
app.get('/:id', (req, res) =>{
    res.json(seachId(req.params.id))
})
//Criando
app.post('/', (req, res) => {
    const currentContent =  readFile()
    const {selecao, grupo} = req.body
    const id = numberRandom()
    currentContent.push({id, selecao, grupo})
    writeFile(currentContent)
    res.send({id, selecao, grupo})
})
// Atualizando 
app.put('/:id', (req, res) => {
    const {id} = req.params
    const {selecao, grupo} = req.body
    const currentContent  = readFile()
    const selectedSelecao = currentContent.findIndex((item) => item.id == id)
    const {id: cId, selecao: cSelecao, grupo: cGrupo} = currentContent[selectedSelecao]

    const newObject = {
        id: cId,
        selecao: selecao ? selecao: cSelecao,
        grupo: grupo ? grupo: cGrupo
    }
    currentContent[selectedSelecao] = newObject
    writeFile(currentContent)
    res.send(newObject)
})

// app.delete('/:id', (req, res) => {
//     const index = buscarFilterIndex(req.params.id)
//     .splice(index, 1)
//     res.send(`Index id: ${req.params.id} excluida com sucesso!`)
// }) 
// Deletando

app.delete('/:id',  (req, res)=> {
    const index = buscarFilterIndex(req.params.id)
    const currentContent = readFile()
    currentContent.splice(index, 1)
    writeFile(currentContent)
    res.send('Aqruivo deletado com sucesso!')
})


export default app // <-- exportando app

