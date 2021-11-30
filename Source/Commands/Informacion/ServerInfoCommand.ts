//@ts-nocheck
import moment from "moment";
import { Discord } from "../../Util/Colors.json";
import { MessageEmbed, TextChannel, Util } from "discord.js";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "serverinfo",
  aliases: ["infoserver", "info-server", "server-info"],
  description:
    "Con este comando podras saber la informacion del servidor desde donde ejecutas el comando.",
  example: [],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  use: ["server-info [server:id]"],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    let server;
    if (!args[0]) {
      server = message.guild;
    } else {
      try {
        server = await client.guilds.fetch(args[0])
      } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        message.lineReply(
          `${client.Emojis.no_check} No tengo acceso a ese servidor debido a que no estoy en ese servidor o no se me hace posible ver la informacion.`);
        return
      }
    }
    let bans = await server.fetchBans();
    let ver = {
      NONE: "Ninguno.",
      LOW: "Bajo.",
      MEDIUM: "Medio.",
      HIGH: "Alto.",
      HIGHEST: "Muy alto.",
    };
    const regions = {
      "us-west": ":flag_us: USA Oeste",
      "us-east": ":flag_us: USA Este",
      "us-central": ":flag_us: USA Central",
      "us-south": ":flag_us: USA Sur",
      singapore: ":flag_sg: Singapur",
      southafrica: ":flag_za: Sudáfrica",
      sydney: ":flag_au: Sídney",
      europe: ":flag_eu: Europa",
      brazil: ":flag_br: Brasil",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Rusia",
      japan: ":flag_jp: Japón",
      india: ":flag_in: India",
      dubai: ":flag_ae: Dubái",
      atlanta: ":flag_ge: Atlanta",
      amsterdam: ":flag_nl: Amsterdam",
      london: ":flag_gb: Londres",
      frankfurt: ":flag_de: Frankfurt",
      "eu-central": ":flag_eu: Europa Central",
      "eu-west": ":flag_eu: Europa Oeste",
    };
    const embed = new MessageEmbed()
      .setColor(Discord)
      .setThumbnail(
        server.iconURL({ dynamic: true, format: "png", size: 2048 })
      )
      .setDescription(
        `<:info:865027701002076170> Informacion general de \`${Util.escapeMarkdown(
          server.name
        )}\`:\n> **Fecha de creacion**:${moment(
          server.createdAt.toISOString()
        ).format("DD/MM/YYYY, hh:mm:ss A")}\n> **Region**:${regions[server.region]
        }\n> **ID del servidor**:${server.id}\n> **Miembros**:${server.memberCount
        }\n> **Miembros conectados**:${server.members.cache.filter((m) => m.user.presence.status == "online")
          .size
        }\n> **Categorías**: ${server.channels.cache.filter((x) => x.type === "category").size
        }\n> **Canales de texto**: ${server.channels.cache.filter((x) => x.type === "text").size
        }\n> **Canales de voz**: ${server.channels.cache.filter((x) => x.type === "voice").size
        }\n> **Dueño del servidor:**:${server.owner.user}\n> **ID del dueño**:${server.ownerID
        }\n> **Emojis**:${server.emojis.cache.size >= 1
          ? `${message.guild.emojis.cache.size}`
          : "Este servidor no cuenta con emojis"
        }\n> **Bots**:${server.members.cache.filter((m) => m.user.bot).size
        }\n> **Canal de sistema**:${server.systemChannel
          ? `${server.systemChannel}`
          : `Este servidor no cuenta con canal del sistema.`
        }\n> **Canal AFK**:${server.afkChannel
          ? `${server.afkChannel}`
          : `Este servidor no cuenta con canal AFK.`
        }\n> **Roles**:${server.roles.cache.size
        }\n> **Nivel de verificacion**:${ver[server.verificationLevel]
        }\n> **Boost**:${server.premiumSubscriptionCount < 1
          ? `${message.guild.premiumSubscriptionCount}`
          : `Todavia no han boosteado este servidor.`
        }`
      )
      .addField(
        "<:more:865027699876823061> Extras",
        `> **Baneos**:${bans.size}`
      );
    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
