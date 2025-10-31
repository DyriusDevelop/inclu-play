const path = require("path")
const fs = require("fs")

const loadAllRoutes = () => {
    let rootPath = path.join(__dirname, "routes")
    let routesFiles = fs.readdirSync(rootPath).filter(file => file.endsWith(".js"))
    
    let all = []
    for (let file of routesFiles) {
        let routes = require(path.join(rootPath, file))
        routes.forEach((route) => {
            if ("method" in route && "uri" in route && "execute" in route) {
                all.push(route)
            }
        })
    }
    return all
}

module.exports = { loadAllRoutes }