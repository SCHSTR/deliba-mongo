require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();

const handler = require("@tomdev/discord.js-command-handler");
const check_packages = require("./events/check_packages");
const cmdhandler = new handler(client, "/src/commands", process.env.PREFIX);

const defaultChannel = require('../models/defaultChannel')

client.on("message", (message) => {
  cmdhandler.handleCommand(message);
});

client.on("ready", async () => {
  console.log("Bot logged in.");

  client.user.setActivity(".ajuda", {type: "STREAMING", url: "https://www.twitch.tv/schstr"});
  check_packages(client);
  setInterval(() => check_packages(client), 1000 * 60 * 60) //Ms * Seconds * Minutes
});

client.on("guildCreate", guild => {
  guild.channels.create('🚚 patch-notes-deliba', {
    type: 'text',
    topic: 'Este é o canal de anúncios e novidades do Deliba, por favor, não exclua esse canal 🥺',
    permissionOverwrites: [{id: guild.id, allow: ['VIEW_CHANNEL'],}]
  }).then(async (result) => {
    await defaultChannel.findOneAndUpdate(
        {guildId: guild.id},
        { $set: { guildId: guild.id, channelId: result.id, discordOwner: guild.ownerID}  },
        { new: true, upsert: true }).exec()   
  }) 
});

(async () => {
  connection = await require("../database/db");
  await client.login(process.env.BOT_TOKEN);
})();
