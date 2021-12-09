//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "roleme",
    aliases: ['role-me'],
    description: 'Con este comando podras agregarte roles a vos mismo.',
    category: 'Roles',
    enable: true,
    onlyOwner: false,
    use: ['roleme <rol>'],
    example: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Necesitas permisos para gestionar roles.`).setColor(Discord))
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Necesito permisos para gestionar roles.`).setColor(Discord))
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Falta de argumentos.\n\n|||roleme **<rol>**||`).setColor(Discord))
        if (message.member.roles.cache.get(role.id)) return message.lineReply(`${client.Emojis.no_check} Ya cuentas con ese rol.`)
        message.member.roles.add(role.id).then((res) => {
            return message.lineReply(`${client.Emojis.check} Te añadi el rol **${role.name}**.`)
        }).catch((res) => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}