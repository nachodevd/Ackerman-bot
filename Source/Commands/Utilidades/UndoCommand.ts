//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed } from 'discord.js';
export const command: Command = {
    name: "undo",
    aliases: [],
    description: "Con este comando podras eliminar mi ultimo mensaje.",
    example: [],
    use: [],
    onlyOwner: false,
    category: 'Utilidades',
    enable: true,
    run: async (client, message, args) => {
        if (!message.guild.me.lastMessage) return message.channel.send('No se reconocio ningun comando.').then((msg) => {
            msg.delete({ timeout: 700 }).catch(() => {
                return message.lineReply(`⚠️ Error desconocido.`)
            })
        })
        message.guild.me.lastMessage.delete().then(() => {
            message.channel.send('Elimine 1 comando.').then((msg) => {
                msg.delete({ timeout: 700 })
            }).catch(() => {
                return message.lineReply(`⚠️ Error desconocido.`)
            })
        })
    }
}