//@ts-nocheck
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
import path from "path";
export const command: Command = {
  name: "invite",
  aliases: ['inv'],
  description: "Con este comando me podras invitar a tu server.",
  example: [],
  use: [],
  category: "Utilidades",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.lineReply(client.permisos.miembro.manage_g);
      if (!message.guild.me.hasPermission("EMBED_LINKS"))
        return message.lineReply(client.permisos.bot.embed);
      message.lineReply('https://saykou.herokuapp.com/invite');
    }
  },
