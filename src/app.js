import express from 'express';  // <-- import express
const app = express(); // <-- criar uma instancia do express
app.use(express.json()) // <-- indica para o express ler arquivos JSON

// mock
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suíça', grupo: 'G'},
    {id: 3, selecao: 'Servia', grupo: 'G'},
]

// criando rota padrão ou raiz
app.get('/', (req, res) => {
    res.send(`Olá, está funcionando!`)
})

app.get('/selecoes', (req, res)=>{
    res.send(selecoes)
})
app.get('/test', (req, res)=>{
    res.status(400).send('<h1>Não é possível acessar esse site</h1>')
})

// Rota criado para postar dados
app.post('/selecoes',  (req, res)=>{
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})
export default app // <-- exportando app
