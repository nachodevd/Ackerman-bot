//@ts-nocheck
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import ascii from 'figlet'
import { MessageEmbed } from 'discord.js';
export const command: Command = {
    name: "ascii",
    aliases: [],
    description: "Con este comando podras convertir un texto en ascii.",
    example: ['ascii Hola'],
    use: ['ascii <...args>'],
    onlyOwner: false,
    category: 'Diversion',
    enable: true,
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se ingreso ningun argumento.`))
        if (args.join(' ').length > 2048) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El contenido sobre pasa los 2048 caracteres.`))
        ascii(args.join(' '), {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }, function (err, res) {
            if (err) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(err)).catch(() => {
                return message.lineReply(`⚠️ Error desconocido.`)
            })
            if (res) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`\`\`\`${res}\`\`\``)).catch(() => {
                return message.lineReply(`⚠️ Error desconocido.`)
            })
        })
    }
}