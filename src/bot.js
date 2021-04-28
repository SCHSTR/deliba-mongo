require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();

const handler = require("@tomdev/discord.js-command-handler");
const check_packages = require("./events/check_packages");
const cmdhandler = new handler(client, "/src/commands", process.env.PREFIX);

const Pacote = require('../models/package')

client.on("message", (message) => {
  cmdhandler.handleCommand(message);
});

client.on("ready", async () => {
  console.log("Bot logged in.");

  client.user.setActivity(".ajuda", {type: "STREAMING", url: "https://www.twitch.tv/schstr"});
  check_packages(client);
  setInterval(() => check_packages(client), 1000 * 60 * 240) //Ms * Seconds * Minutes
});

(async () => {
  connection = await require("../database/db");
  await client.login(process.env.BOT_TOKEN);
})();
