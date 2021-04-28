const { load } = require("./load")
function loadCommands(handler) {
    console.log("Loading Commands");
    load(handler);
    console.log("All commands loaded in " + (Date.now() - handler.startTime) + "ms");
}
exports.loadCommands = loadCommands
