//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "emoji-list",
    aliases: ['e-l', 'el'],
    category: "Utilidades",
    description:
        "Con este comando podras ver la lista de emojis del servidor donde ejecutes el comando.",
    example: [],
    use: [],
    enable: true,
    onlyOwner: false,
    run: async (client, message, args) => {
        const nm = Math.ceil(message.guild.emojis.cache.map((e) => `${e} **-** \`:${e.name}:\``).join(', ').length / 2000),
            embed = new MessageEmbed().setColor(Discord)
        for (var i = 0; i < nm; i++) {
            message.channel.send(embed.setDescription(message.guild.emojis.cache.map((e) => `${e} **-** \`:${e.name}:\``).join(', ').slice(i * 2000, (i + 1) * 2000))
            ).catch(() => {
                return message.lineReply(`⚠️ Error desconocido.`)
            });
        }
    }
}