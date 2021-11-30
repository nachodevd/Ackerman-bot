//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "balance",
    aliases: ['bal'],
    description:
        "Con este comando podras ver el estado monetario de un miembro.",
    example: [],
    category: "Economia",
    enable: true,
    onlyOwner: false,
    use: ["bal [miembro]"],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
            memberEconomy,
            conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (!member) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Error desconocido.
	`))
        memberEconomy = await Economy.getUser(member.id, member.guild.id)
        if (!memberEconomy) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} El miembro nunca trabajo/recibio dinero, por lo que no cuenta con una economia. 
	`))
        else return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
    Dinero en la billetera actualmente: \`${conv(memberEconomy.Wallet)}\`
    Dinero en el banco actualmente: \`${conv(memberEconomy.Bank)}\`
    Dinero en total: \`${conv(memberEconomy.Bank + memberEconomy.Wallet)}\`
`))

    }
}