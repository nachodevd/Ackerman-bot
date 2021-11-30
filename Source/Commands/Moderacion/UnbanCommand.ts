//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "unban",
  aliases: [],
  description: "Con este comando podras desbanear gente.",
  example: ['unban 657349954498461699'],
  use: ['unban <miembro:id>'],
  onlyOwner: false,
  category: 'Moderacion',
  enable: true,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.lineReply(client.permisos.bot.ban);
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.lineReply(client.permisos.miembro.ban);
    var id = args[0]
    if (!id) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}unban **id**||
	`))
    var reason = args.slice(1).join(' ') || 'No se implemento una razon'
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.lineReply(`${client.Emojis.no_check} Este servidor no cuenta con baneos.`)
      let unbanuser = bans.find(b => b.user.id == id)
      if (!unbanuser) return message.lineReply(`${client.Emojis.no_check} No hay un miembro baneado con ese id.`)
      message.guild.members.unban(id, reason).catch(() => {
        message.lineReply(`${client.Emojis.no_check} No pude desbanear al miembro.`)
        return
      }).then(async e => {
        message.lineReply(`${client.Emojis.check} Desbanee al miembro **${(await client.users.fetch(`${id}`)).username}**.`)
      })
    })
  },
};
