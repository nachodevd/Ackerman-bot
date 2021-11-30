//@ts-nocheck
import { Command } from "../../Base/Command";
import { crearDB } from 'megadb'
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel } from "discord.js";
const db = new crearDB({ carpeta: 'Database', nombre: 'SugChannelDrive' });
const cache = new crearDB({ carpeta: 'Cache', nombre: 'message_cache' })
import { suggestion } from '../../cache/message_cache.json'
export const command: Command = {
    name: "set-sug",
    aliases: ['set-suggestion', 'sug-set'],
    description: "Con este comando podras establecer el canal donde llegaran las sugerencias en el servidor.",
    example: ['set-sug set #Sugerencias'],
    use: ['set-sug <opcion:del|set> <canal:id|mencion>'],
    category: 'Sugerencias',
    enable: true,
    onlyOwner: false,
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(`Necesitas permisos para gestionar el servidor.`)
        let opcion = args[0]
        if (!opcion) return message.lineReply('```\n' + `${command.use}` + '\n```')
        switch (opcion) {
            case "set": {
                let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
                if (!canal) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
                ${client.Emojis.no_check} Error de argumentos.
                
                ||set-sug <opcion:del|set> **<canal:id|mencion>**||
                `))
                if (!(canal as TextChannel)) return message.lineReply(`${client.Emojis.no_check} El canal debe ser de tipo \`Texto\`.`)
                if (!canal.viewable) return message.lineReply(`${client.Emojis.no_check} El canal no es visible.`)
                if (!message.guild.channels.cache.get(canal.id)) return message.lineReply(`${client.Emojis.no_check} El canal no forma parte de este servidor.`)
                db.set(message.guild.id, canal.id)
                message.lineReply(`${client.Emojis.check} Estableci ${canal.name} como el canal donde llegaran las sugerencias.`)
            }; break;
            case "del": {
                if (db.tiene(message.guild.id)) {
                    db.eliminar(message.guild.id)
                    message.lineReply(`${client.Emojis.check} Elimine el canal de sugerencias.`)
                } else {
                    message.lineReply(`${client.Emojis.no_check} No hay ningun canal establecido.`)
                }
            }; break;
            default: message.lineReply(`${client.Emojis.no_check} Esa opcion no es correcta.`)
        }


    },
};
