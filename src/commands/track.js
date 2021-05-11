require("dotenv");
const { rastrearEncomendas } = require("correios-brasil"); //API para rastreio dos correios
const pacote = require('../../models/package') //Schema para o banco de dados

module.exports = {
  name: "track", //neded
  aliases: ["t"],
  category: "Main Category",
  description: "Comando usado para rastreio de encomenda",
  usage: ".track",
  run: async function (client, command, args, message) {
    
    var userId = message.author.id
    var userCode = message.content.split(' ')[1]
    var requestCode;

    var apelido = []

    var fullMessage = message.content.split(' ')
    for (var i = 2; i < fullMessage.length; i++){
      apelido.push(fullMessage[i])
    }

    var apelidoToString = apelido.toString();
    var apelidoProduto = apelidoToString.replace(/,/g, " ");

    console.log(userCode, apelidoProduto)

    if(userCode == null || apelidoProduto == "") {
      message.reply('parece que você digitou o comando de forma errada, é só digitar por exemplo `.t SEU_CODIGO AirForce 1` 😉')
    }else if(userCode.length != 13){ 
      message.reply('esse código não parece ser dos correios, você consegue checar ele pra ver se ta tudo certinho? 😊')
    }else if(userCode.length === 13){
      requestCode = [userCode]

      console.log('Código de rastreio em array ' + requestCode)
      console.log('Apelido para o produto ' + apelidoProduto)
      console.log('Usuário que executou o código ' + userId)

      await rastrearEncomendas(requestCode).then(response => correios_response = response)
      const correiosData = correios_response[0].pop()

      if(correiosData != undefined){

      let query = await pacote.findOneAndUpdate(
          { trackCode: userCode },
          { $set: {userId: userId, apelido: apelidoProduto, status: correiosData.status, local: correiosData.local, origem: correiosData.origem, destino: correiosData.destino} },
          {new: true, upsert: true}
          ).exec().then(
            message.reply('sua encomenda foi registrada ou atualizada com sucesso! Agora eu estarei rastreando ela para você! 🙏🏻😎')
          )

        console.log(query)

          // userId: String,
          // telegramId: String,
          // trackCode: {type: String, unique: true},
          // apelido: String,
          // status: String,
          // local: String,
          // origem: String,
          // destino: String
        
      }
    }


  }
} 