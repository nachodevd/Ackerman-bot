//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import path from "path";
export const command: Command = {
  name: "check-permissions",
  aliases: [],
  category: "Utilidades",
  description: "Con este comando podras ver los permisos tuyos y mios.",
  example: [],
  use: [],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    let ban = (await message.guild.me.hasPermission("BAN_MEMBERS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let kick = (await message.guild.me.hasPermission("KICK_MEMBERS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let mandar = (await message.guild.me.hasPermission("SEND_MESSAGES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let eme = (await message.guild.me.hasPermission("EMBED_LINKS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let reac = (await message.guild.me.hasPermission("ADD_REACTIONS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let canales = (await message.guild.me.hasPermission("MANAGE_CHANNELS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let Gestionarme = (await message.guild.me.hasPermission("MANAGE_MESSAGES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let verca = (await message.guild.me.hasPermission("VIEW_CHANNEL"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let roles = (await message.guild.me.hasPermission("MANAGE_ROLES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let ponejs = (await message.guild.me.hasPermission("ATTACH_FILES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let sevm = (await message.guild.me.hasPermission("MANAGE_GUILD"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let verm = (await message.guild.me.hasPermission("READ_MESSAGE_HISTORY"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let admin = (await message.guild.me.hasPermission("ADMINISTRATOR"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let ban1 = (await message.member.hasPermission("BAN_MEMBERS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let kick1 = (await message.member.hasPermission("KICK_MEMBERS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let mandar1 = (await message.member.hasPermission("SEND_MESSAGES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let eme1 = (await message.member.hasPermission("EMBED_LINKS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let reac1 = (await message.member.hasPermission("ADD_REACTIONS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let canales1 = (await message.member.hasPermission("MANAGE_CHANNELS"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let Gestionarme1 = (await message.member.hasPermission("MANAGE_MESSAGES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let verca1 = (await message.member.hasPermission("VIEW_CHANNEL"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let roles1 = (await message.member.hasPermission("MANAGE_ROLES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let ponejs1 = (await message.member.hasPermission("ATTACH_FILES"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let sevm1 = (await message.member.hasPermission("MANAGE_GUILD"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let verm1 = (await message.member.hasPermission("READ_MESSAGE_HISTORY"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let admin1 = (await message.member.hasPermission("ADMINISTRATOR"))
      ? client.Emojis.check
      : client.Emojis.no_check;
    let embed1 = new MessageEmbed()
      .setDescription(
        `
 Permisos de ${client.user.username} para su uso.
        
    Administrador:${admin}
    Banear Miembros:${ban}
    Kickear Miembros:${kick}
    Añadir Reacciones:${reac}
    Ver Canales:${verca}
    Subir Archivos:${ponejs}
    Ver El Historial De Mensajes:${verm}
    Gestionar Servidor:${sevm}
    Gestionar Mensajes:${Gestionarme}
    Mandar Mensajes:${mandar}
    Mandar Embeds:${eme}
    Gestionar Roles:${roles}
    Gestionar Canales:${canales}

    Tus permisos (${message.member.displayName}) para el uso del bot.
    Administrador:${admin1}
    Banear Miembros:${ban1}
    Kickear Miembros:${kick1}
    Añadir Reacciones:${reac1}
    Ver Canales:${verca1}
    Subir Archivos:${ponejs1}
    Ver El Historial De Mensajes:${verm1}
    Gestionar Servidor:${sevm1}
    Gestionar Mensajes:${Gestionarme1}
    Mandar Mensajes:${mandar1}
    Mandar Embeds:${eme1}
    Gestionar Roles:${roles1}
    Gestionar Canales:${canales1}

   `
      )
      .setColor(Discord);
    message.lineReply(embed1);
  },
};
