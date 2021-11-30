//@ts-nocheck

import { Command } from "../../Base/Command";
import { randomFumo } from "fumo-api";
import { MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
  name: "fumo",
  description: "Este comando sirve para obtener una imagen random de un fumo.",
  aliases: [],
  category: "Diversion",
  enable: true,
  onlyOwner: false,
  example: [],
  use: [],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    message.lineReply(
      new MessageEmbed().setImage(await randomFumo()).setColor(Discord)
    ).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
