//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageAttachment } from "discord.js";
import { Rank } from 'canvacord'
import LevelModel from "../../Models/LevelModel";
export const command: Command = {
    name: "level",
    aliases: ['lvl'],
    description: "Con este comando podras ver tu nivel, xp y estadisticas de niveles.",
    example: [],
    category: "Niveles",
    enable: true,
    onlyOwner: false,
    use: [],
    run: async (client, message, args) => {
        var schema = await LevelModel.findOne({
            Guild: message.guild.id,
        })
        if (!schema) return message.lineReply(`${client.Emojis.no_check} Todavia no se establecio un canal para los niveles.`)
        const rank = new Rank().setDiscriminator(message.member.user.discriminator).setUsername(message.member.user.username).setAvatar(message.member.user.displayAvatarURL({ format: 'png' })).setCurrentXP(schema.XP).setRequiredXP((5 * (schema.Level ** 2) + 50 * schema.Level + 100)).setLevel(schema.Level).setStatus(message.member.user.presence.status, true).setBackground('COLOR', schema.ImageURL)
        rank.build()
            .then(buffer => {
                const img = new MessageAttachment(buffer, 'img.png')
                return message.lineReply(img)
            })
    }
}