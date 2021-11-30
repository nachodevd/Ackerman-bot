//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, MessageAttachment } from 'discord.js';
import { Canvacord } from 'canvacord'
export const command: Command = {
    name: "rip",
    aliases: [],
    description: "Con este comando podras crear una tumba con el avatar de alguien... o tuyo.",
    example: [],
    use: ['rip [user]'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
            image = await Canvacord.rip(member.user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 })),
            img = new MessageAttachment(image, 'img.png')
        return message.lineReply(img).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}