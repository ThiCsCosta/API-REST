import app from './src/app.js'
const PORT = 3000; // <-- definir porta


// Escutar porta
app.listen(PORT, ()=>{
    console.log(`Servidor rodando no local http://localhost:${PORT}`)
})

