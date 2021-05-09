const { BaseManager, MessageEmbed, MessageCollector } = require("discord.js");
const defaultChannel = require("../../models/defaultChannel");

module.exports = {
  name: "novo", //neded
  aliases: ["n"],
  category: "Administração",
  description: "This is an example command",
  usage: "!example",
  run: async function (client, command, args, message) {
    //needed

    let guildId;
    let newChannel;
    let discordOwner = message.guild.ownerID;

    await message.guild.channels
      .create("🚚 patch-notes-deliba", {
        type: "text",
        topic:
          "Este é o canal de anúncios e novidades do Deliba, não exclua esse canal 🥺",
        permissionOverwrites: [
          { id: message.guild.id, allow: ["VIEW_CHANNEL"] },
        ],
      })
      .then((result) => {
        guildId = message.guild.id;
        newChannel = result.id;
      });

    let query = await defaultChannel
      .findOneAndUpdate(
        { guildId: guildId },
        { $set: { channelId: newChannel, discordOwner: discordOwner } },
        { new: true, upsert: true }
      ).exec()
      .then(message.reply("canal criado com sucesso 🙏🏻"));

      console.log(query)
  },
};
