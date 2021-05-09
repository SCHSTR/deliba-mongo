const { rastrearEncomendas } = require("correios-brasil");
const { MessageEmbed } = require("discord.js");
const packages = require("../../models/package");

module.exports = async function checkPackages(client) {
  console.log("checkPackages está rodando!");

  let arrayConsulta = [];
  let correios_response;
  let values;
  let correiosData = [];
  const getDataInfo = await packages.find();

  if (getDataInfo.length > 0) {
    for (var i = 0; i < getDataInfo.length; i++) {
      arrayConsulta.push(getDataInfo[i].trackCode);
    }
  }

  await rastrearEncomendas(arrayConsulta).then((response) => {
    correios_response = response;
    values = Object.values(correios_response);
  });

  values.forEach((v, i) => {
    correiosData = v.pop();
    let dbData = getDataInfo[i];

    console.log(correiosData.local, correiosData.origem)

    if (
      dbData.status != correiosData.status ||
      correiosData.local != undefined && dbData?.local != correiosData.local ||
      correiosData.origem != undefined && dbData?.origem != correiosData.origem
    ) {
      if (correiosData.local) {
        packages
          .updateOne(
            { trackCode: dbData.trackCode },
            { $set: { status: correiosData.status, local: correiosData.local } }
          ).exec().then(
            () => {
              if(dbData?.apelido){
                client.users.fetch(dbData.userId, false).then((user) => {
                  user.send(attLocal);
                });
              }else{
                client.users.fetch(dbData.userId, false).then((user) => {
                  user.send(attLocalByCode);
                });
              } 
            }
          );     
      }

      if (correiosData.origem) {
        packages
          .updateOne(
            { trackCode: dbData.trackCode },
            { $set: {status: correiosData.status, origem: correiosData.origem, destino: correiosData.origem } }
          ).exec().then(
            () => {
              if(dbData?.apelido){
                client.users.fetch(dbData.userId, false).then((user) => {
                  user.send(attOrigem);
                });
              }else{
                client.users.fetch(dbData.userId, false).then((user) => {
                  user.send(attOrigemByCode);
                });
              } 
            }
          );
      }
    }

    let attLocal = new MessageEmbed()
    .setColor("GOLD")
    .setTitle(
      `Encontrei uma atualização no seu pedido ${dbData.apelido}`
    )
    .setDescription(
      `Seu pedido agora está em **${correiosData.status}**`
    )
    .addFields({ name: "Local", value: `${correiosData.local}` })
    .setFooter("made with 💕 by schstr#5420")
    .setTimestamp();

  let attLocalByCode = new MessageEmbed()
    .setColor("GOLD")
    .setTitle(
      `Encontrei uma atualização no seu pedido ${dbData.trackCode}`
    )
    .setDescription(
      `Seu pedido agora está em **${correiosData.status}**`
    )
    .addFields({ name: "Local", value: `${correiosData.local}` })
    .setFooter("made with 💕 by schstr#5420")
    .setTimestamp();

  let attOrigem = new MessageEmbed()
    .setColor("GOLD")
    .setTitle(
      `Encontrei uma atualização no seu pedido ${dbData.apelido}`
    )
    .setDescription(
      `Seu pedido agora está em **${correiosData.status}**`
    )
    .addFields(
      { name: "Origem", value: `${correiosData.origem}` },
      { name: "Destino", value: `${correiosData.destino}` }
    )
    .setFooter("made with 💕 by schstr#5420")
    .setTimestamp();

  let attOrigemByCode = new MessageEmbed()
    .setColor("GOLD")
    .setTitle(
      `Encontrei uma atualização no seu pedido ${dbData.trackCode}`
    )
    .setDescription(
      `Seu pedido agora está em **${correiosData.status}**`
    )
    .addFields(
      { name: "Origem", value: `${correiosData.origem}` },
      { name: "Destino", value: `${correiosData.destino}` }
    )
    .setFooter("made with 💕 by schstr#5420")
    .setTimestamp();
  });
};
