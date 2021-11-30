//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, MessageAttachment } from 'discord.js';
import { Canvacord } from 'canvacord'
export const command: Command = {
    name: "ohno",
    aliases: [],
    description: "...",
    example: [],
    use: ['ohno <msg>'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        const msg = args.join(' ')
        if (!msg) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} Se debe de ingresar un texto que no supere los 20 caracteres.`))
        if (msg.length > 20) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El texto no debe superar los 20 caracteres.`))
        const image = await Canvacord.ohno(msg),
            img = new MessageAttachment(image, 'img.png')
        return message.lineReply(img).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}