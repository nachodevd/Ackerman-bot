//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "with",
    aliases: ['withdraw'],
    description:
        "Con este comando podras retirar dinero del banco.",
    example: ["with 200"],
    category: "Economia",
    enable: true,
    onlyOwner: false,
    use: ["with [dinero:numero] [all:todo tu dinero en mano]"],
    run: async (client, message, args) => {
            const member = await Economy.getUser(message.member.id, message.guild.id),
                conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
        if (member.Bank <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} No cuentas con dinero para retirar.`))
        const dinero = args[0]
        if (!dinero) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}with **[dinero:numero] [all:todo tu dinero en mano]**||
	`))
        if (args[0] === 'all') {
            Economy.Withdraw(message.member.id, message.guild.id, member.Bank).then(() => {
                return message.lineReply(`${client.Emojis.check} Retiraste ${conv(member.Bank)}usd de tu banco`)
            })
            return
        }
        if (isNaN(dinero)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
    ${client.Emojis.no_check} Error de argumentos.

||El argumento <dinero> no es un numero.||
`))
        if (Number(dinero) <= 0) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se pueden agregar numeros negativos.`))

        else if (dinero > member.Bank) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
${client.Emojis.no_check} El monto ingresado supera tu disponibilidad.`))
        Economy.Withdraw(message.member.id, message.guild.id, dinero).then(() => {
            return message.lineReply(`${client.Emojis.check} Retiraste ${conv(dinero)}usd de tu banco`)
        })
    }
}