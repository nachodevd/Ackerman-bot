//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed } from 'discord.js';
export const command: Command = {
    name: "reversetext",
    aliases: [],
    description: "Con este comando podras dar vuelta un texto.",
    example: ['reversetext hola 321 => 123 aloh'],
    use: ['reversetext <...args>'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        if(!args.join(' ')) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se ingreso ningun argumento.`))
        if(args.join(' ').length > 2048) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El contenido sobre pasa los 2048 caracteres.`))
        return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(args.join(' ').split('').reverse().join(''))).catch(() => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}