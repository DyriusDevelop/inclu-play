const sqlite = require("sqlite3").verbose()
const db = new sqlite.Database("./demo.db")

// Configuração das tabelas do banco
db.serialize(() => {
    db.run(`CREATE TABLE clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf INTEGER UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        address TEXT NOT NULL
    )`)
})

module.exports = { db }