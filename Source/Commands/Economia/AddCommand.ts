//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
	name: "add",
	aliases: ['agregar'],
	description:
		"Con este comando le podras agregar dinero a un usuario.",
	example: ["add @Miembro 200"],
	category: "Economia",
	enable: false,
	onlyOwner: false,
	use: ["add <miembro> <dinero:numero> [--dinero::--banco]"],
	run: async (client, message, args) => {
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]),
			memberEconomy,
			dinero = Number(args[1]),
			conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
		if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(`${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`)
		if (!member) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}add **<miembro>** <dinero> [--dinero::--banco]||
	`))
		memberEconomy = await Economy.getUser(member.id, member.guild.id)
		if (!dinero) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}add <miembro> **<dinero>** [--dinero::--banco]||
	`))
		if (isNaN(dinero)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Error de argumentos.
		
||El argumento <dinero> no es un numero.||
	`))
		if (Number(dinero) <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se pueden agregar numeros negativos.`))
			if (args.join(' ').endsWith('--dinero')) {
				if (memberEconomy.Wallet > 100000000) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
			${client.Emojis.no_check} La billetera ya supero los 100 millonesde usd, debe depositar el dinero o de lo contrario no podra recibir mas dinero en la billetera.`))
				Economy.addWallet(member.id, message.guild.id, dinero)
				message.lineReply(`${client.Emojis.check} Agregaste ${conv(dinero)}usd en la billetera de ${member.user.username}.`)
			} else if (args.join(' ').endsWith('--banco')) {
				Economy.addBank(member.id, message.guild.id, dinero)
				message.lineReply(`${client.Emojis.check} Agregaste ${conv(dinero)}usd en el banco de ${member.user.username}.`)
			} else {
				if (memberEconomy.Wallet > 100000000) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
			${client.Emojis.no_check} La billetera ya supero los 100 millones de usd, debe depositar el dinero o de lo contrario no podra recibir mas dinero en la billetera.`))
				Economy.addWallet(member.id, message.guild.id, dinero)
				message.lineReply(`${client.Emojis.check} Agregaste ${conv(dinero)}usd en la billetera de ${member.user.username}.`)
			}
	}
}

