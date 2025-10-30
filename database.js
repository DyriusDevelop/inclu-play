const sqlite = require("sqlite3").verbose()

// SQL para criação das tabelas
const sqlUserTable = `CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf INTEGER UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL
)`

// Criação da conexão com o banco e criação das tabelas caso não existam
const db = new sqlite.Database("./demo.db", (err) => {
    if (err) {
        console.error(`Erro ao abrir banco de dados : ${err.message}`)
        return
    }
    console.log("Conectado ao banco de dados SQLite")
})

db.exec(sqlUserTable, (err) => {
    if (err) {
        console.error(`Erro ao tentar criar tabela 'clients' : ${err.message}`)
    } else {
        console.log("Tabela 'clients' criado com sucesso!")
    }
})

module.exports = { db }