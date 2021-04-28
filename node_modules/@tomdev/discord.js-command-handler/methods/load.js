var fs = require("fs")
function load(handler) {
    var paths = getAllPaths(process.cwd() + handler.path)
    paths.forEach(file => {
        if (!file.endsWith(".js")) return
        var command = require(file)
        if (command.name && command.run) {
            handler.commands[command.name] = command;
            handler.commands[command.name].filename = file
            if(handler.commands[command.name].aliases){
                for (alias in handler.commands[command.name].aliases) {
                    handler.aliases[handler.commands[command.name].aliases[alias]] = command.name
                }
            }
        }
    })
}
exports.load = load

var paths = []
function getAllPaths(path) {
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(path + "/" + file).isDirectory()) getAllPaths(path + "/" + file)
        else paths.push(path + "/" + file)
    })
    return paths
}