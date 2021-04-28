# Discord.js Command Handler

Easily manage commands.

## Install

```bash
npm i @tomdev/discord.js-command-handler
```

## Usage

### Main file

```javascript
//discord.js libary
var discord = require("discord.js")
var client = new discord.Client()

var handler = require("@tomdev/discord.js-command-handler")
//initialize handler, pass client, folder with command files, prefix
var prefix = "!" //same for every server
/*var prefix = { //define for each server
    "default": "!" //if server hasn't
    "6166856194426361379": "?" //prefix for server with id
    "6166856194426361380": "$" //prefix for server with id
}*/ 
var cmdhandler = new handler(client, "/commands", prefix)

//handle command on message event
client.on("message", (message) => {
    cmdhandler.handleCommand(message)
})
```

### Command files
Example commands on [Github](https://github.com/TGamingStudio/discord.js-command-handler/tree/master/example-commands)
```javascript
module.exports = {
    name: "example", //neded
    aliases: ["e", "exa"],
    category: "Main",
    description: "This is an example command",
    usage: "!example",
    run: async function (client, command, args, message) { //needed
        message.channel.send("Hello World!")
    }
}
```

### Features and Description
Find all methods and properties on [Wiki](https://github.com/TGamingStudio/discord.js-command-handler/wiki)