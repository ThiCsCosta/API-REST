import express, { Router } from 'express';  // <-- import express
const app = express(); // <-- criar uma instancia do express
import * as fs from 'node:fs';

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
app.post('/', (req, res) => {
    const {id, selecao, grupo} = req.body
    const currentContent =  readFile()
    currentContent.push({id, selecao, grupo})
    writeFile(currentContent)
    res.send({id, selecao, grupo})
})
// criando rota padrão ou raiz
app.get('/', (req, res) => {
    res.send(readFile())
})

app.get('/selecoes', (req, res)=>{
    res.send(readFile())
})
app.get('/test', (req, res)=>{
    res.status(400).send('<h1>Não é possível acessar esse site</h1>')
})

// Rota criado para postar dados
app.post('/selecoes',  (req, res)=>{
    selecoes.push(req.body)
    res.status(200).send('Seleção cadastrada com sucesso!')
})
export default app // <-- exportando app

