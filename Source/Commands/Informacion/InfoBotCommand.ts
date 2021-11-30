//@ts-nocheck
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
import { dependencies } from "../../../package.json";
import { mem, cpu, os } from "node-os-utils";
import { Discord } from "../../Util/Colors.json";
import { stripIndent } from "common-tags";
export const command: Command = {
  name: "infobot",
  aliases: ["info-bot", "botinfo", "bot-info"],
  description: "Con este comando podras saber las especificaciones del bot.",
  example: [],
  use: [],
  category: "Informativo",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    const { totalMemMb, usedMemMb } = await mem.info();
    const systeminfo = stripIndent`
    OS        : ${await os.oos()}
    CPU       : ${cpu.model()}
    Cores     : ${cpu.count()}
    CPU Usage : ${await cpu.usage()} %
    RAM       : ${totalMemMb} MB
    RAM Usage : ${usedMemMb} MB 
    `;
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
    let embed = new MessageEmbed()
      .addField(
        "➥ **<:sobre:893545425464872976> Informacion Basica:**",
        `
    >  Nombre de usuario: **${client.user.username}**
    >  Tag: **${client.user.discriminator}**
    >  ID: **${client.user.id}**
    >  Username: **${client.user.username}**
    >  Ping: **${client.ws.ping}**
      
      `
      )
      .addField(
        "➥ **<:info:893545595770376214> Datos:**",
        `
    >  Ultimo Guardado:****${formatDate(
      "HH Horas, mm Minutos y ss Segundos",
      client.uptime
    )}****
    > Fecha de creacion: **${formatDate(
      "DD/MM/YYYY a las HH:mm:ss",
      client.user.createdAt
    )}**
    > Lenguaje: **Typescript**
    > API: **Discord.js V${dependencies["discord.js"]}**
    > Creador: **${(await client.users.fetch("624320717571227658")).tag}**
      `
      )
      .addField(
        "➥ **<:core:893545709394096148> Core:**",
        `
      \`\`\`yaml\n${systeminfo}\`\`\`
      `
      )
      .setThumbnail(client.user.avatarURL())
      .setColor(Discord)
    message.lineReply(embed).catch(() => {
      return message.lineReply(`⚠️ Error desconocido.`)
  });
  },
};
