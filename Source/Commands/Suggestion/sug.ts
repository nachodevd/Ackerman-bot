//@ts-nocheck
import { Command } from "../../Base/Command";
import { crearDB } from 'megadb'
import { Discord } from "../../Util/Colors.json";
import { suggestion } from '../../cache/message_cache.json'
import { MessageEmbed, TextChannel } from "discord.js";
const db = new crearDB({ carpeta: 'Database', nombre: 'SugChannelDrive' });
const cache = new crearDB({ carpeta: 'Cache', nombre: 'message_cache' })
export const command: Command = {
    name: "suggestion",
    aliases: ['sugerencia', 'sug'],
    description: "Con este comando podras hacer sugerencias.",
    example: ['sugerencia Implementar nuevas reglas'],
    use: ['sug <texto?[imagen]>'],
    category: 'Sugerencias',
    enable: true,
    onlyOwner: false,   
    run: async (client, message, args) => {
        if (db.tiene(message.guild.id)) {
            var can = await db.obtener(`${message.guild.id}`)
            var sugerencia = args.join(' ')
            if (!sugerencia) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
            ${client.Emojis.no_check} Error de argumentos.
            
            ||sug **<texto?[imagen]>**||
            `))
            if (sugerencia.length >= 1024) return message.lineReply(`${client.Emojis.no_check} La sugerencia no debe pasar de los 1024 caracteres.`)
            let xprsn = /https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp)/g;
            if (!message.attachments.size && !args.slice(1024).join(' ').match(xprsn)) {
                var embed = new MessageEmbed()
                    .addField('Sugestor:', message.member.user.tag)
                    .addField('Sugerencia:', sugerencia)
                    .setDescription('**Estado:**\nPendiente')
                    .setColor('FFF033')
                    .setTimestamp()
                    .setFooter(message.member.user.tag, message.member.user.avatarURL());
                try {
                    (client.channels.cache.get(can) as TextChannel).send(embed).then(e => {
                        e.edit(embed.addField('ID de la sugerencia:', '```js\n' + `${e.id}` + '\n```'));
                        message.react(client.Emojis.check)
                        e.react(client.Emojis.check)
                        e.react(client.Emojis.no_check)
                    })
                    return
                } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
                    message.lineReply(client.Emojis.no_check + ' El canal ya no existe o no tengo permisos para enviar mensajes en ese canal.')
                }
            } else {
                let img = args.slice(1024).join(' ') || message.attachments.map(attachment => attachment.url).join();
                var embed = new MessageEmbed()
                    .addField('Sugestor:', message.member.user.tag)
                    .addField('Sugerencia:', sugerencia)
                    .setColor('FFF033')
                    .setTimestamp()
                    .setDescription('**Estado:**\nPendiente')
                    .setImage(img)
                    .setFooter(message.member.user.tag, message.member.user.avatarURL());
                try {
                    (client.channels.cache.get(can) as TextChannel).send(embed).then(e => {
                        e.edit(embed.addField('ID de la sugerencia:', '```js\n' + `${e.id}` + '\n```'));
                        message.react(client.Emojis.check)
                        e.react(client.Emojis.check)
                        e.react(client.Emojis.no_check)
                    })
                } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
                    message.lineReply(client.Emojis.no_check + ' El canal ya no existe o no tengo permisos para enviar mensajes en ese canal.')

                }
            }
        } else {
            message.lineReply(`${client.Emojis.no_check} No se establecio ningun canal al cual llegaran las sugerencias. Para establecer nu canal usa **.set-sug set <canal:id|mencion>**`)
        }
    },
};
