//@ts-nocheck
import _ from "axios";
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { replaceLength } from "../../Util/extensions";
export const command: Command = {
  name: "docs",
  aliases: [],
  category: "Utilidades",
  description:
    "Con este comando podras ver ayuda de la documentacion de discord.js",
  example: ["docs MessageEmbed"],
  use: ["docs <...> "],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!args.join(" "))
      return message.lineReply(
        `${client.Emojis.no_check} No se ingreso ningun argumento.`
      );
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${args.join(
      " "
    )}`;
    _.get(url)
      .then(({ data }) => {
        if (data) {
          const embed = new MessageEmbed();
          embed.fields.map((field) =>
            field.value.length > 1000
              ? replaceLength(field.value, 1000, 1000)
              : replaceLength(field.value, 1000, 1000)
          );
          if (embed.description) {
            embed.description.length > 2000
              ? replaceLength(field.value, 2000, 2000)
              : replaceLength(field.value, 2000, 2000)
          }
          embed.setColor(Discord);
          if (embed.fields.values.length > 1000)
            replaceLength(embed.fields.values.toString(), 1000, 1000);
          message.channel
            .send("", { embed: data as MessageEmbed })
            .catch((e) => {
              return message.lineReply(`⚠️ Error desconocido.`)
            });
        } else {
          message.lineReply(
            client.Emojis.no_check +
            ` No se encontro lo ingresado en los argumentos ||${args.join(
              " "
            )}||`
          );
        }
      })
      .catch((e) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        message.lineReply(`⚠️ Error desconocido.`)
        message.lineReply(
          client.Emojis.no_check +
          ` No se encontro lo ingresado en los argumentos ||${args.join(
            " "
          )}||`
        );
        return;
      });
  },
};
