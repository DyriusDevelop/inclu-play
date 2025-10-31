module.exports = [
    // Rota padrão
    {
        method : "get",
        uri : "/login",
        execute (request, response, db) {
            response.render("login")
        }
    },
    // Rota da ação do formulário
    {
        method : "post",
        uri : "/login",
        execute (request, response, db) {
            const { email, password } = request.body
            console.log(`Dados recebidos : ${email}, ${password}`)
        }
    }
]