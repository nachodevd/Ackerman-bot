//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "remove",
    aliases: ['quitar'],
    description:
        "Con este comando le podras quitar dinero a un usuario.",
    example: ["remove @Miembro 200"],
    category: "Economia",
    enable: true,
    onlyOwner: false,
    use: ["remove <miembro> <dinero:numero> [--dinero::--banco]"],
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]),
            memberEconomy,
            dinero = Number(args[1]),
            conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(`${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`)
        if (!member) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}remove **<miembro>** <dinero> [--dinero::--banco]||
	`))
        memberEconomy = await Economy.getUser(member.id, member.guild.id)
        if (!dinero) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}remove <miembro> **<dinero>** [--dinero::--banco]||
	`))
        if (isNaN(dinero)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Error de argumentos.
	
||El argumento <dinero> no es un numero.||
	`))
		if (Number(dinero) <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se pueden agregar numeros negativos.`))

        if (args.join(' ').endsWith('--dinero')) {
            if (memberEconomy.Wallet <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
			${client.Emojis.no_check} La billetera del miembro no supera el dolar`))
            Economy.removeWallet(member.id, message.guild.id, dinero)
            message.lineReply(`${client.Emojis.check} Removiste ${conv(dinero)}usd en la billetera de ${member.user.username}.`)
        } else if (args.join(' ').endsWith('--banco')) {
            if (memberEconomy.Bank <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
			${client.Emojis.no_check} El banco del miembro no supera el dolar.`))
            Economy.removeBank(member.id, message.guild.id, dinero)
            message.lineReply(`${client.Emojis.check} Removiste ${conv(dinero)}usd del banco de ${member.user.username}.`)
        } else {
            if (memberEconomy.Wallet <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
			${client.Emojis.no_check} La billetera del miembro no supera el dolar.`))
            Economy.removeWallet(member.id, message.guild.id, dinero);
            message.lineReply(`${client.Emojis.check} Removiste ${conv(dinero)}usd de la billetera de ${member.user.username}.`)
        }
    }
}