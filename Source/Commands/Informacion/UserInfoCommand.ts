//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "userinfo",
  aliases: ["infouser", "info-user", "user-info"],
  description:
    "Con este comando podras obtener informacion sobre un usuario/miembro.",
  example: ["infouser 544771759107342338"],
  use: ["infouser <user:id|mencion>"],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    let estados = {
      online: "🟢 En Linea",
      idle: "🟠 Ausente",
      dnd: "🔴 No molestar",
      offline: "⚫️ Desconectado o invisible",
    };
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    function formatDate(template, date) {
      var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
      date = new Date(
        date || Date.now() - new Date().getTimezoneOffset() * 6e4
      );
      return date
        .toISOString()
        .split(/[-:.TZ]/)
        .reduce(function (template, item, i) {
          return template.split(specs[i]).join(item);
        }, template);
    }
    let badges1 = {
      EARLY_SUPPORTER: "<:BadgeEarlySupporter:882037932410675230>",
      DISCORD_EMPLOYEE: "<:BadgeEmployee:882037932523925514>",
      DISCORD_PARTNER: "<:BadgePartner:882037932691697684>",
      HYPESQUAD_EVENTS: "<:BadgeHypesquad:882037932108697683>",
      HOUSE_BRAVERY: "<:BadgeBravery:882037932037402635>",
      HOUSE_BRILLIANCE: "<:BadgeBrilliance:882037932033191936>",
      BUGHUNTER_LEVEL_1: "<:BadgeBughunter:882037932041576489>",
      BUGHUNTER_LEVEL_2: "<:BadgeBughunter:882037931945123871>",
      VERIFIED_DEVELOPER: "<:BadgeVerifiedBotDeveloper:882037932599423058>",
      HOUSE_BALANCE: "<:BadgeBalance:882037931592785981>",
      VERIFIED_BOT: "<:VerifiedBot:882039868153294848>",
    };
    var embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Info de ${member.user.username}`)
      .setThumbnail(
        member.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .addField(
        "➥ Informacion:",
        `> Nombre: **${member.user.username}**\n> Tag: **#${
          member.user.discriminator
        }**\n> Apodo: **${
          member.nickname !== null ? `${member.nickname}` : "No tiene apodo"
        }**\n> Presencia: **${
          estados[member.user.presence.status]
        }**\n> Id: **${member.user.id}**\n> Insignias: **${
          member.user.flags.toArray().length
            ? member.user.flags
                .toArray()
                .map((badge) => badges1[badge])
                .join(" ")
            : "No tiene insignias"
        }**`
      )
      .addField(
        "➥ Datos:",
        `> Cuenta Creada: **${formatDate(
          "DD/MM/YYYY a las HH:mm:ss",
          member.user.createdAt
        )}**\n> Estado: **${
          member.presence.activities[0]
            ? member.presence.activities[0].state
            : "Sin estado"
        }**`
      )
      .addField(
        "➥ Como miembro",
        `Fecha de entrada al server:**${formatDate(
          "DD/MM/YYYY a las HH:mm:ss",
          member.joinedAt
        )}**\n> Roles:**${member.roles.cache
          .map((roles) => `\`${roles.name}\``)
          .join(", ")}**`
      )
      .addField(
        "➥ Permisos:",
        `\`\`\`${member.permissions.toArray().join(", ")}\`\`\``
      );
    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
