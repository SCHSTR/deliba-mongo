const { rastrearEncomendas } = require("correios-brasil");
const { MessageEmbed } = require("discord.js");
const Pacote = require("../../models/package");

module.exports = async function checkPackages(client) {
  console.log("checkPackages está rodando!");

  let arrayConsulta = [];
  let correios_response;
  let values;
  let getCorreiosInfo = [];

  const getDataInfo = await Pacote.find();

  if (getDataInfo.length > 0) {
    for (var i = 0; i < getDataInfo.length; i++) {
      arrayConsulta.push(getDataInfo[i].trackCode);
    }
  }

  await rastrearEncomendas(arrayConsulta).then((response) => {
    correios_response = response;
    values = Object.values(correios_response);
  });

  if (values.length > 0) {
    for (var i = 0; i < values.length; i++) {
      getCorreiosInfo = values[i].pop();

      if (getCorreiosInfo.origem == undefined) {
        if (getDataInfo[i].status != getCorreiosInfo.status) {
          let result = await Pacote.updateOne(
            { trackCode: getDataInfo[i].trackCode },
            {
              $set: {
                status: getCorreiosInfo.status,
                origem: getCorreiosInfo.origem,
                destino: getCorreiosInfo.destino,
                local: getCorreiosInfo.local,
              },
            }
          );

          console.log(result);

          if (result.nModified > 0) {
            client.users.fetch(getDataInfo[i].userId, false).then((user) => {
              user.send(atualizacaoOrigemUndefined);
            });
          }
        }

        if (getDataInfo[i].local != getCorreiosInfo.local) {
          let result = await Pacote.updateOne(
            { trackCode: getDataInfo[i].trackCode },
            {
              $set: {
                status: getCorreiosInfo.status,
                origem: getCorreiosInfo.origem,
                destino: getCorreiosInfo.destino,
                local: getCorreiosInfo.local,
              },
            }
          );

          console.log(result);

          if (result.nModified > 0) {
            client.users.fetch(getDataInfo[i].userId, false).then((user) => {
              user.send(atualizacaoOrigemUndefined);
            });
          }
        }
      }

      if (getCorreiosInfo.local == undefined) {
        if (getDataInfo[i].status != getCorreiosInfo.status) {
          let result = await Pacote.updateOne(
            { trackCode: getDataInfo[i].trackCode },
            {
              $set: {
                status: getCorreiosInfo.status,
                origem: getCorreiosInfo.origem,
                destino: getCorreiosInfo.destino,
                local: getCorreiosInfo.local,
              },
            }
          );

          console.log(result);

          if (result.nModified > 0) {
            client.users.fetch(getDataInfo[i].userId, false).then((user) => {
              user.send(atualizacaoLocalUndefined);
            });
          }
        }

        if (getDataInfo[i].origem != getCorreiosInfo.origem) {
          let result = await Pacote.updateOne(
            { trackCode: getDataInfo[i].trackCode },
            {
              $set: {
                status: getCorreiosInfo.status,
                origem: getCorreiosInfo.origem,
                destino: getCorreiosInfo.destino,
                local: getCorreiosInfo.local,
              },
            }
          );

          console.log(result);

          if (result.nModified > 0) {
            client.users.fetch(getDataInfo[i].userId, false).then((user) => {
              user.send(atualizacaoLocalUndefined);
            });
          }
        }
      }

      let atualizacaoOrigemUndefined = new MessageEmbed()
        .setColor("GOLD")
        .setTitle(
          `Encontrei uma atualização no seu pedido ${getDataInfo[i].trackCode}`
        )
        .setDescription(
          `Seu pedido agora está em **${getCorreiosInfo.status}**`
        )
        .addFields({ name: "Local", value: `${getCorreiosInfo.local}` })
        .setFooter("made with 💕 by schstr#5420")
        .setTimestamp();

      let atualizacaoLocalUndefined = new MessageEmbed()
        .setColor("GOLD")
        .setTitle(
          `Encontrei uma atualização no seu pedido ${getDataInfo[i].trackCode}`
        )
        .setDescription(
          `Seu pedido agora está em **${getCorreiosInfo.status}**`
        )
        .addFields(
          { name: "Origem", value: `${getCorreiosInfo.origem}` },
          { name: "Destino", value: `${getCorreiosInfo.destino}` }
        )
        .setFooter("made with 💕 by schstr#5420")
        .setTimestamp();
    }
  }
};
