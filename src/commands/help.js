const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ajuda", //neded
    aliases: ["a", "help", "h"],
    category: "Main",
    description: "Comando de ajuda",
    usage: ".ajuda",
    run: async function (client, command, args, message) { //needed

        let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTitle(`Oi! Eu sou a Deliba!`)
        .setDescription('Minha função é fazer o rastreio e tracking de suas encomendas nos correios, você pode usar meus comandos da lista abaixo:')
        .addFields(
             { name: ".rastreio | .r", value: '```Se você digitar .r _SEU CÓDIGO_, eu vou fazer uma verificação rápida pra você e te indicar onde ele está ✌```' },           
             { name: ".track | .t", value: '```Se você digitar .t _SEU CÓDIGO_, eu vou rastrear seu pedido e atualizar minha lista a cada 3horas, se ele for atualizado pelos correios eu te aviso aqui mesmo 🥺```' },
             { name: ".ajuda | .help", value: '```Exibe essa mensagem```' },
           )
        .setFooter('made with 💕 by schstr#5420')
        .setTimestamp()

         
            await message.author.send({files: ["https://thumbs.gfycat.com/GrossForkedAfricanbushviper-max-1mb.gif"]})

            message.author.send(embed)
        }    
}