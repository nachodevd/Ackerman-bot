//@ts-nocheck
import { Command } from "../../Base/Command";
import weather from "weather-js";
import { HaveNumber } from "../../Util/extensions";
import { MessageEmbed, TextChannel } from "discord.js";
export const command: Command = {
  name: "clima",
  aliases: [],
  description:
    "Con este comando podras saber las especificaciones atmosfericas.",
  example: ["clima Cordoba, Argentina"],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  use: ["clima <localizacion>"],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    if (!args.join(" "))
      return message.lineReply(
        `${client.Emojis.no_check} Falta de argumentos. ||${client.getConfig.prefix}clima **<localizacion>**||`
      );
    if (HaveNumber(args.toString())) {
      return message.lineReply(
        `${client.Emojis.no_check} Los paises no contienen numeros.`
      );
    }
    if (args.toString().includes(`${Number}`)) {
      return message.lineReply(
        `${client.Emojis.no_check} Los paises no contienen numeros.`
      );
    }

    const numeric = Number(args.join(" "));
    if (!isNaN(numeric))
      return message.lineReply(
        `${client.Emojis.no_check} Los paises no contienen numeros.`
      );
    weather.find(
      { search: args.join(" ").replace(/^[0-9]*$/, ""), degreeType: "C" },
      function (err, result) {
        if (err) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: ${command.name},
          Error: \`\`\`${error}\`\`\`
          `);
        });
            return message.lineReply(
              `${client.Emojis.no_check} No encontre esa localizacion.`
            );
        } 
        var current = result[0].current;
        var location = result[0].location;
        const embed = new MessageEmbed()

          .setDescription("`" + current.skytext + "`")
          .setAuthor(`Estado climático en ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor("#6666cc")
          .addField("Zona Horaria", `GMT${location.timezone}`, true)
          .addField(
            "Temperatura",
            `${current.temperature} Grados ${location.degreetype}`,
            true
          )
          .addField("Viento", current.windspeed, true)
          .addField("Humedad", `${current.humidity}%`, true)
          .addField("Fecha", current.day + " " + current.date, true)
          .setTimestamp();
        message.lineReply(embed);
      }
    );
  },
};
