//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "dep",
    aliases: ['depositar'],
    description:
        "Con este comando podras depositar tu dinero a tu banco.",
    example: ["dep 200"],
    category: "Economia",
    enable: true,
    onlyOwner: false,
    use: ["dep [dinero:numero] [all:todo tu dinero en mano]"],
    run: async (client, message, args) => {
        const member = await Economy.getUser(message.member.id, message.guild.id),
            conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
        if (member.Wallet <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} No cuentas con dinero para depositar.`))
        const dinero = args[0]
        if (!dinero) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}dep **[dinero:numero] [all:todo tu dinero en mano]**||
	`))
        if (args[0] === 'all') {
            Economy.Deposit(message.member.id, message.guild.id, member.Wallet).then(() => {
                return message.lineReply(`${client.Emojis.check} Depositaste ${conv(member.Wallet)}usd a tu banco`)
            })
            return
        }
        if (isNaN(dinero)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
    ${client.Emojis.no_check} Error de argumentos.

||El argumento <dinero> no es un numero.||
`))
        if (Number(dinero) <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se pueden agregar numeros negativos.`))

        else if (dinero > member.Wallet) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
${client.Emojis.no_check} El monto ingresado supera tu disponibilidad.`))
        Economy.Deposit(message.member.id, message.guild.id, dinero).then(() => {
            return message.lineReply(`${client.Emojis.check} Depositaste ${conv(dinero)}usd a tu banco`)
        })
    }
}