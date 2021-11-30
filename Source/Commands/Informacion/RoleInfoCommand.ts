//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed } from "discord.js";
import moment from "moment";
export const command: Command = {
  name: "roleinfo",
  aliases: ["role-info", "info-role", "rol-info", "info-rol"],
  description: "Con este comando podras saber la informacion sobre un rol.",
  example: ["roleinfo @Miembro"],
  use: ["roleinfo <rol:mencion|id>"],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
      if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);

    const permissions = {
      ADMINISTRATOR: "Administrador",
      VIEW_AUDIT_LOG: "Ver registro de auditoría",
      VIEW_GUILD_INSIGHTS: "Ver información del servidor",
      MANAGE_GUILD: "Administrar servidor",
      MANAGE_ROLES: "Administrar roles",
      MANAGE_CHANNELS: "Administrar canales",
      KICK_MEMBERS: "Expulsar Members",
      BAN_MEMBERS: "Banear miembros",
      CREATE_INSTANT_INVITE: "Crear invitación",
      CHANGE_NICKNAME: "Cambiar apodo",
      MANAGE_NICKNAMES: "Administrar apodos",
      MANAGE_EMOJIS: "Administrar emojis",
      MANAGE_WEBHOOKS: "Administrar webhooks",
      VIEW_CHANNEL: "Leer canales de texto y ver canales de voz",
      SEND_MESSAGES: "Enviar mensajes",
      SEND_TTS_MESSAGES: "Enviar mensajes TTS",
      MANAGE_MESSAGES: "Administrar mensajes",
      EMBED_LINKS: "Insertar enlaces",
      ATTACH_FILES: "Adjuntar archivos",
      READ_MESSAGE_HISTORY: "Leer historial de mensajes",
      MENTION_EVERYONE: "Mencionar @everyone, @here y todos los roles",
      USE_EXTERNAL_EMOJIS: "Usar emojis externos",
      ADD_REACTIONS: "Agregar reacciones",
      CONNECT: "Conectar",
      SPEAK: "Hablar",
      STREAM: "Trasmitir",
      MUTE_MEMBERS: "Silenciar miembros",
      DEAFEN_MEMBERS: "Miembros sordos",
      MOVE_MEMBERS: "Mover miembros",
      USE_VAD: "Usar actividad de voz",
      PRIORITY_SPEAKER: "Orador prioritario",
    };

    const yesno = {
      true: "`Si`",
      false: "`No`",
    };

    if (!role)
      return message.lineReply("```\n" + `${command.use}` + "\n```");

    const rolePermissions = role.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
      if (rolePermissions.includes(permission))
        finalPermissions.push(`✔️ ${permissions[permission]}`);
      else finalPermissions.push(`❌ ${permissions[permission]}`);
    }

    const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${
      message.guild.roles.cache.size
    }\``;

    const embed = new MessageEmbed()

      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .addField("Nombre", role, true)
      .addField("ID", `\`${role.id}\``, true)
      .addField("Posicion", position, true)
      .addField("Mencionable?", yesno[role.mentionable], true)
      .addField("Rol de un bot?", yesno[role.managed], true)
      .addField("Visible?", yesno[role.hoist], true)
      .addField("Color", `\`${role.hexColor.toUpperCase()}\``, true)
      .addField("Miembros que lo tienen", `\`${role.members.size}\``, true)
      .addField(
        "Fecha de creacion",
        `\`${moment(role.createdAt).format("DD/MMM/YYYY")}\``,
        true
      )
      .addField("Permisos", `\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``)
      .setColor("#6666cc");

    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
