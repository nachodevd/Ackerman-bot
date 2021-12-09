//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "addrole",
    aliases: ['add-role'],
    description: 'Con este comando podes agregarle roles a un miembro.',
    category: 'Roles',
    enable: true,
    onlyOwner: false,
    use: ['add-role <miembro> <rol>'],
    example: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Necesitas permisos para gestionar roles.`).setColor(Discord))
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Necesito permisos para gestionar roles.`).setColor(Discord))
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]),
            member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Falta de argumentos.\n\n|||addrole **<miembro>** <rol>||`).setColor(Discord))
        if (!role) return message.lineReply(new MessageEmbed().setDescription(`${client.Emojis.no_check} Falta de argumentos.\n\n|||addrole <miembro> **<rol>**||`).setColor(Discord))
        if(member.roles.cache.get(role.id)) return message.lineReply(`${client.Emojis.no_check} El miembro ya cuenta con ese rol.`)
        member.roles.add(role.id).then((res) => {
            return message.lineReply(`${client.Emojis.check} Se añadio el rol **${role.name}** a **${member.displayName}**.`)
        }).catch((res) => {
            return message.lineReply(`⚠️ Error desconocido.`)
        })
    }
}