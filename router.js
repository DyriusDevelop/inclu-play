const path = require("path")
const fs = require("fs")

const loadAllRoutes = () => {
    let rootPath = path.join(__dirname, "routes")
    let routesFiles = fs.readdirSync(rootPath).filter(file => file.endsWith(".js"))
    
    let routes = []
    for (let file of routesFiles) {
        let route = require(path.join(rootPath, file))
        if ("method" in route && "uri" in route && "execute" in route) {
            routes.push(route)
        }
    }

    return routes
}

module.exports = { loadAllRoutes }