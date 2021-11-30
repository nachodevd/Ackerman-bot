//@ts-nocheck
import { Command } from '../../Base/Command'
import { TextChannel } from "discord.js";
export const command: Command = {
	name: 'kick',
	description: 'Con este comando podras expulsar a miembros.',
	use: ['kick <miembro:id::mencion> [razon]'],
	example: ['kick 1234567891234567'],
	category: 'Moderacion',
	aliases: [],
	onlyOwner: false,
	enable: true,
	run: async (client, message, args) => {
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.lineReply(client.Emojis.no_check + ' Necesitas permisos para expulsar miembros.')
		if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReply(client.Emojis.no_check + ' Necesito permisos para expulsar miembros.')
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const razon = args.slice(1).join(" ") || 'No se especifico una razon'
		if (!member) return message.lineReply(`${client.Emojis.no_check} Falta de argumentos.
		
||${client.getConfig.prefix}kick **<miembro>**||`)
		if (member.id == message.member.id) return message.lineReply(`${client.Emojis.no_check} No puedes auto expulsarte.`)
		if (member.id == client.user.id) return message.lineReply(`${client.Emojis.no_check} No me puedo auto expulsar.`)
		else {
			member.kick(razon).then(() => { message.react(client.Emojis.check) }).catch((err: string) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
				message.lineReply(`
El miembro no pudo ser expulsado.

||${`${err}`.slice(17)}||
`)
				return
			})

		}

	}
}
