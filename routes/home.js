module.exports = {
    method : "get",
    uri : "/",
    execute(request, respose, db) {
        respose.render("home", {title : "Principal"})
    }
}