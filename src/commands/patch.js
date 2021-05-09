const { MessageEmbed, MessageCollector } = require("discord.js");
const defaultChannel = require("../../models/defaultChannel");

module.exports = {
  name: "patch", //neded
  aliases: ["p"],
  category: "Main",
  description: "Command Reserved for Staff",
  usage: "!example",
  run: async function (client, command, args, message) {
    //needed

    if (message.author.id != "217820643926736897") {
      console.log("Comando reservado para o desenvolvedor");
      return;
    }

    const Guilds = client.guilds.cache.map(guild => guild.id);
    const getGuildDetails = client.guilds.cache.map(guild => guild)

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
            embedContent.body = replyBody.content

            //const getDataInfo = await defaultChannel.find()

    
            let patchNotes = new MessageEmbed()
            .setAuthor('Notas de Atualização | Deliba')
            .setColor("GOLD")
            .setTitle(embedContent.head)
            .setDescription(embedContent.body)
            .setFooter("made with 💕 by schstr#5420")
            .setTimestamp();
        
            for(var i = 0; i < Guilds.length; i++){
              //console.log(Guilds[i])
              let query = await defaultChannel.findOne(
                                  {guildId: Guilds[i]}
                                )
        
              if(query != null){
                client.channels.cache.get(query.channelId).send('@everyone')
                .then(
                  client.channels.cache.get(query.channelId).send(patchNotes)
                  )
              } else if(getGuildDetails[i].systemChannelID != null){
                client.channels.cache.get(getGuildDetails[i].systemChannelID).send('@everyone')
                .then(
                  client.channels.cache.get(getGuildDetails[i].systemChannelID).send(patchNotes)
                  )
              } else {
                console.log(`O dono do servidor é ` + getGuildDetails[i].ownerID)
                client.users.fetch(getGuildDetails[i].ownerID, false).then((user) => {
                  user.send('Message Content');
                });
              }
            }
        
          });
      });
 },
};
