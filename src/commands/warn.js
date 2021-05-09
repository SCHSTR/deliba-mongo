const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn", //neded
  aliases: ["w"],
  category: "Root",
  description: "Command Reserved for Staff",
  run: async function (client, command, args, message) {

    if (message.author.id != "217820643926736897") {
        console.log("Comando reservado para o desenvolvedor");
        return;
      }

    const embedContent = {};
    await message.channel.send(`Insira o Título do Embed`);
    let cp = message.channel
      .createMessageCollector((m) => m.author.id == message.author.id, {
        max: 1,
      })
      .on("collect", async (replyHead) => {
        embedContent.head = replyHead.content;

        await message.channel.send(`Insira o conteúdo da mensagem`);
        message.channel
          .createMessageCollector((m) => m.author.id == message.author.id, {
            max: 1,
          })
          .on("collect", async (replyBody) => {
            embedContent.body = replyBody.content;
              await client.guilds.cache.map((guild) => {

            let warnEmbed = new MessageEmbed()
              .setAuthor("Mensagem Referente ao servidor | "+ guild.name)
              .setColor("GOLD")
              .setTitle(embedContent.head)
              .setDescription(embedContent.body)
              .setFooter("made with 💕 by schstr#5420")
              .setTimestamp();

                client.users.fetch(guild.ownerID, false).then((user) => {
                  user.send(warnEmbed);
                });
              });
          });
      });
  },
};
