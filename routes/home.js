module.exports = {
    method : "get",
    uri : "",
    execute(request, response, db) {
        if (request.session && request.session.loggedUser) {
            response.render("home", {title : "Principal"})
        } else {
            response.redirect("/login")
        }
    }
}