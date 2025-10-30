module.exports = {
    method : "get",
    uri : "/login",
    execute (request, response, db) {
        response.render("login")
    }
}