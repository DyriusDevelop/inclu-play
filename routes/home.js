module.exports = {
    method : "get",
    uri : "/",
    execute(request, respose) {
        respose.render("home", {title : "Principal"})
    }
}