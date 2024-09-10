import express from 'express';  // <-- import express
const app = express(); // <-- criar uma instancia do express

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

app.get('/lista', (req, res)=>{
    res.send(selecoes)
})
app.get('/test', (req, res)=>{
    res.status(400).send('<h1>Não é possível acessar esse site</h1>')
})
export default app // <-- exportando app
