//@ts-nocheck
import { Command } from "../../Base/Command";
import moment from "moment";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel } from "discord.js";
export const command: Command = {
  name: "channelinfo",
  aliases: ["ch-info", "info-canal", "infochannel", "info-ch", "chinfo"],
  description: "Con este comando podras saber la informacion de un canal.",
  example: ["chinfo #Canal"],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  use: ["chinfo [canal:mencion|id]"],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);

    const channelType = {
      dm: "DM",
      text: `\`Texto\``,
      voice: `\`Voz\``,
      category: `\`Categoria\``,
      news: `\`Anuncios\``,
      store: `\`Tienda\``,
    };
    let channel;

    if (args[0]) {
      try {
        channel =
          message.mentions.channels.first() ||
          (await client.channels.fetch(args[0]));
      } catch (error) {
        client.channels.cache.get('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: ${command.name},
          Error: \`\`\`${error}\`\`\`
          `);
        })
        return message.lineReply(
          `${client.Emojis.no_check} No tengo acceso a ese canal.`
        );
      }
    } else channel = message.channel;
    const totalUsers = channel.members.size;
    const bots = channel.members.array().filter((b) => b.user.bot).length;
    const humans = channel.members.size - bots;
    const NFSW = {
      true: "`Si`",
      false: "`No`",
    };

    const embed = new MessageEmbed()
      .addField("Nombre", channel, true)
      .addField("ID", `\`${channel.id}\``, true)
      .addField("Tipo", channelType[channel.type], true)
      .addField("Miembros totales", `\`${totalUsers}\``, true)
      .addField("Miembros humanos", `\`${humans}\``, true)
      .addField("Bots", `\`${bots}\``, true)
      .addField(
        "Fecha de creacion",
        `\`${moment(channel.createdAt).format("DD/MMM/YYYY")}\``,
        true
      )
      .addField("NSFW?", `\`${NFSW[channel.nsfw]}\``, true)
      .setColor(Discord);

    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
