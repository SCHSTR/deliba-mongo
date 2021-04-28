const { load } = require("./load")
function reloadCommands(handler) {
    console.log("Reloading Commands");
    handler.aliases = {};
    var reloadStart = Date.now();
    for (command in handler.commands) {
        delete require.cache[require.resolve(handler.commands[command].filename)];
        delete handler.commands[command];
    }
    load(handler);
    console.log("All commands reloaded in " + (Date.now() - reloadStart) + "ms");
}
exports.reloadCommands = reloadCommands
