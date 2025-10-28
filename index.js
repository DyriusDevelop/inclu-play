require("dotenv").config()
const path = require("path")
const express = require("express")
const db = require("./database")

// Configurando Express
const app = express()
app.use(express.json())
app.set("views", path.join(__dirname, "public"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

// Registrando todas as rotas encontradas na pasta routes
const routes = require("./router").loadAllRoutes()
Object.entries(routes).forEach(([key, value]) => {
    if (key === "get") {
        app.get(value.uri, (request, response) => value.execute(request, response, db))
    } else if (key === "post") {
        app.set(value.uri, (request, response) => value.execute(request, response, db))
    }
})

// Execução do programa
const server = app.listen(process.env.PORT, () => {
    console.log(`Executando servidor em localhost:${process.env.PORT}`)
})

// Registrando evento de desligamento
const shutdown = () => {
    console.log("Desligando servidor...")
    server.close(() => {
        console.log("Servidor desligado.")
        process.exit(0)
    })
}
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)