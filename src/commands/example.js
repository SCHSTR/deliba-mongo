const pool = require("../../database/db");

module.exports = {
    name: "example", //neded
    aliases: ["e", "exa"],
    category: "Main",
    description: "This is an example command",
    usage: "!example",
    run: async function (client, command, args, message) { //needed

        pool.query('SELECT * FROM pacotes;', (err, res) => {
            console.log(res.rows)
            pool.end()
        })

        message.channel.send("Hello World!")
    }
}