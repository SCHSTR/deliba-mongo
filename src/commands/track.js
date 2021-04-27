require("dotenv");
const { rastrearEncomendas } = require("correios-brasil"); //API para rastreio dos correios
const Pacote = require('../../models/package') //Schema para o banco de dados

module.exports = {
  name: "track", //neded
  aliases: ["t"],
  category: "Main Category",
  description: "Comando usado para rastreio de encomenda",
  usage: ".track",
  run: async function (client, command, args, message) {
    
    var user_id = message.author.id
    var codigo_do_usuario = message.content.split(' ')[1]
    var codigo_request;

    //Tratativas de validação do código de rastreio
    if(codigo_do_usuario === undefined) message.reply('parece que você não digitou nenhum código 😢\n Digite `.track SEU_CODIGO` para que eu possa te ajudar!');
    if(message.content.split(' ')[2] != undefined) message.reply('você só precisa digitar a mensagem assim: `.track SEU_CÓDIGO` 😉');
    if(codigo_do_usuario.length != 13) message.reply('tem certeza que isso é um código dos Correios? Ele parece estar incorreto 🤯');
    if(codigo_do_usuario.length === 13) {

      codigo_request = [codigo_do_usuario]
      await rastrearEncomendas(codigo_request).then(response => correios_response = response)

      const correios_data = correios_response[0].pop()
      if(correios_data != undefined){
        
        let pacote = new Pacote({
          userId: user_id,
          trackCode: codigo_do_usuario,
          status: correios_data.status,
          local: correios_data.local,
          origem: correios_data.origem,
          destino: correios_data.destino,
        }) 

        pacote.save({}, function (err) {
          if (err){
            message.reply('parece que este código já está sendo rastreado 🥳')
          }else{
            message.reply('seu produto foi cadastrado com sucesso e vai ser rastreado 🙏🏻🥰')
          }        
        }) 
      }else{
        message.reply('parece que seu código expirou, ou não está mais cadastrado no sistema dos correios 😢')
      }
    }


  }
} 