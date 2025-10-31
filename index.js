require("dotenv").config()
const path = require("path")
const express = require("express")
const db = require("./database")
const session = require("express-session")

// Configurando Express
const app = express()
app.use(express.json())
app.set("views", path.join(__dirname, "public"))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 3, // Tempo de vida de cookie em milissegundos (3 horas)
        secure : false //TODO: mudar para 'true' quando o servidor usar https
    }
}))
app.use(express.urlencoded({ extended : true }))

// Registrando todas as rotas encontradas na pasta routes
const allRoutes = require("./router").loadAllRoutes()
allRoutes.forEach((route) => {
    console.log(route)
    app[route.method](route.uri, (request, response) => route.execute(request, response, db))
})


// Execução do programa
const server = app.listen(process.env.PORT, () => {
    console.log(`Executando servidor em http://www.localhost:${process.env.PORT}`)
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