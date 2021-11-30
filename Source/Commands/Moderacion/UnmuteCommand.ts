//@ts-nocheck
import { crearDB } from 'megadb'
const muteados = new crearDB({ carpeta: 'Database', nombre: 'MuteUserDrive' }),
  rol_mute = new crearDB({ carpeta: 'Database', nombre: 'RolMuteDrive' })
import t from "google-translate-api";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel } from 'discord.js';
export const command: Command = {
  name: "unmute",
  aliases: ['desmute'],
  description: "Con este comando podras desilenciar a un miembro ya silenciado anteriormente.",
  example: ['unmute 1234567891234567'],
  use: ['unmute <miembro:id|mencion>'],
  onlyOwner: false,
  category: 'Moderacion',
  enable: true,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(client.Emojis.no_check + 'Necesitas permisos para gestionar roles.')
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.lineReply(client.Emojis.no_check + 'No tengo permisos para gestionar roles.')
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]),
      role = await rol_mute.get(message.guild.id)
    if (!user) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Falta de argumentos.
	
||${client.getConfig.prefix}desmute **<miembro>**||
	`))
    if (!user.roles.cache.get(role)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El miembro no esta silenciado.`))
    try {
      user.roles.remove(role, 'Fue desilenciado por la moderacion.').then((res) => {
        message.lineReply(`${client.Emojis.check} Pude desilenciar al miembro correctamente.`)
        muteados.eliminar(user.id)
      })
    } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
      t(`${error}`.slice(17), { to: "spanish" }).then((response) => {
        message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No pude desilenciar al miembro correctamente debido al siguiente error \`${response.text}\`.`))
      });
    }
  },
};
