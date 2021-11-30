//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
  name: "servericon",
  aliases: ["server-icon"],
  description: "Con este comando podras ver el icono del servidor",
  example: [],
  use: ["servericon [id]"],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    let server;
    if (!args[0]) server = message.guild;
    else {
      try {
        server = (await client.guilds.fetch(args[0]))
      } catch (error) {
        message.lineReply(
          `${client.Emojis.no_check} Hubo un error al tratar de obtener los detalles sobre el servidor.`
        );
      }
    }
    const embed = new MessageEmbed()
      .setImage(server.iconURL({ dynamic: true, size: 1024 }))
      .setColor(Discord);
    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
