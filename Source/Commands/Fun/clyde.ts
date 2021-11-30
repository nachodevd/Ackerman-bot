//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, MessageAttachment } from 'discord.js';
import { Canvacord } from 'canvacord'
export const command: Command = {
    name: "clyde",
    aliases: [],
    description: "...",
    example: [],
    use: ['clyde <msg>'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        const member = args.join(' ')
        if (!member) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} Se debe de ingresar un texto que no supere los 100 caracteres.`))
        if (member.length > 100) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El texto supera los 50 caracteres.`))
        const image = await Canvacord.clyde(member),
            img = new MessageAttachment(image, 'img.png')
        return message.lineReply(img).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}