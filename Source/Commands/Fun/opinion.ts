//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, MessageAttachment } from 'discord.js';
import { Canvacord } from 'canvacord'
export const command: Command = {
    name: "opinion",
    aliases: [],
    description: "...",
    example: [],
    use: ['opinion <user> <msg>'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]),
            mensaje = args.slice(1).join(' ')
        if (!member) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} Se debe de ingreasar un miembro.`))
        if (!mensaje) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} Se debe ingresar un texto.`))
        const image = await Canvacord.opinion(member.user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 }), mensaje),
            img = new MessageAttachment(image, 'img.png')
        return message.lineReply(img).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}