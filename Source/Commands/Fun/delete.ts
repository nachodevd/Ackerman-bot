//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, MessageAttachment } from 'discord.js';
import { Canvacord } from 'canvacord'
export const command: Command = {
    name: "delete",
    aliases: [],
    description: "...",
    example: [],
    use: ['delete [user] [--dark]'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        let dark
        if (args.join(' ').endsWith('--dark')) dark = true
        else dark = false
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
            image = await Canvacord.delete(member.user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 }), dark),
            img = new MessageAttachment(image, 'img.png')
        return message.lineReply(img).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}