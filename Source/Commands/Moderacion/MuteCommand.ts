//@ts-nocheck
import { crearDB } from 'megadb'
const muteados = new crearDB({ carpeta: 'Database', nombre: 'MuteUserDrive' }),
  rol_mute = new crearDB({ carpeta: 'Database', nombre: 'RolMuteDrive' })
import t from "google-translate-api";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel } from 'discord.js';
export const command: Command = {
  name: "mute",
  aliases: ['silenciar'],
  description: "Con este comando podras silenciar a un miembro.",
  example: ['mute 1234567891234567'],
  use: ['mute <miembro:id|mencion>'],
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
	
||${client.getConfig.prefix}mute **<miembro>**||
	`))
    if (user.roles.cache.get(role)) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El miembro ya esta silenciado.`))
    if (user.roles.cache.find(role => role.name === 'Silenciado')) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} El miembro ya esta silenciado.`))
    const newRole = await message.guild.roles.create({
      data: {
        name: 'Silenciado',
        color: '030303',
        permissions: 0,
      }
    })
    try {
      user.roles.add(newRole.id, 'Fue silenciado por la moderacion.').then((res) => {
        message.lineReply(`${client.Emojis.check} Pude silenciar al miembro correctamente.`)
        muteados.set(user.id, true)
        rol_mute.set(message.guild.id, newRole.id)
      })
    } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
      t(`${error}`.slice(17), { to: "spanish" }).then((response) => {
        message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No pude silenciar al miembro correctamente debido al siguiente error \`${response.text}\`.`))
      });
      return
    }
  },
};
