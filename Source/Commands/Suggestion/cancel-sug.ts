//@ts-nocheck
import { Command } from "../../Base/Command";
import { crearDB } from 'megadb'
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel } from "discord.js";
const db = new crearDB({ carpeta: 'Database', nombre: 'SugChannelDrive' });
const cache = new crearDB({ carpeta: 'Cache', nombre: 'message_cache' })
import { suggestion } from '../../cache/message_cache.json'
import { getLineAndCharacterOfPosition } from "typescript";
export const command: Command = {
    name: "deny-sug",
    aliases: ['deny-sugerencia', 'deny-sug'],
    description: "Con este comando podras rechazar sugerencias",
    example: ['deny-sug 884547878670979072'],
    use: ['deny-sug <id> [razon]'],
    category: 'Sugerencias',
    enable: true,
    onlyOwner: false,
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(`Necesitas permisos para gestionar el servidor.`)
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`Necesito permisos para gestionar mensajes.`)
        if (db.tiene(message.guild.id)) {
            if (!args[0]) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
            ${client.Emojis.no_check} Error de argumentos.
            
            ||deny-sug **<id>** [razon]||
            `))
            let razon = args.slice(1).join(' ') ? `\n**Razon:**\n${args.slice(1).join(' ')}` : ''
            try {
                (await (client.channels.cache.get(await db.get(message.guild.id)) as TextChannel).messages.fetch(args[0]))
            } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
                return message.lineReply(`${client.Emojis.no_check} El mensaje no proviene del canal establecido para las sugerencias.`)
            }
            let msg = (await (client.channels.cache.get(await db.get(message.guild.id)) as TextChannel).messages.fetch(args[0]))
            if (!msg) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check}  El mensaje no fue encontrado.`))
            if (!msg.editable) return message.lineReply(`${client.Emojis.no_check} No puedo editar un mensaje de otro usuario.`)
            if (!msg.embeds) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El mensaje no es un embed/sugerencia.`))
            if (suggestion.includes(msg.id)) return message.lineReply(`${client.Emojis.no_check} Esa sugerencia ya fue rechazada/aceptada.`)
            msg.edit(msg.embeds.map(e => e.setDescription('**Estado:**\nRechazada' + razon).setColor('RED'))).then(() => {
                message.lineReply(`${client.Emojis.check} Se rechazo la sugerencia.`);
                cache.push('suggestion', msg.id)
            })
        } else {
            message.lineReply(`${client.Emojis.no_check} Necesitas establecer un canal de sugerencias para suar este comando. Para establecer nu canal usa **$set-sug set <canal:id|mencion>**`)
        }
    },
};
