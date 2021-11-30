//@ts-nocheck
import translate from "google-translate-api";
import { MessageAttachment, MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "traductor",
  aliases: ["translate"],
  description: "Con este comando podras traducir texto al idioma que elijas.",
  example: ["translate hola Japanese"],
  use: ["translate <texto> <idioma>"],
  category: 'Utilidades',
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(
        "Necesito permisos para mandar embeds."
      );
    const idioma = args[0];
    if (!idioma)
      return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
      ${client.Emojis.no_check} Falta de argumentos.
      
      ||translate **<texto>** <idioma>||
      `))
    const texto = args.slice(1).join(" ");
    if (!texto)
      return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
    ${client.Emojis.no_check} Falta de argumentos.
    
    ||translate <texto> **<idioma>**||
    `))
    translate(texto, { to: idioma })
      .then((res) => {
        const embed = new MessageEmbed()
          .setDescription(
            `${client.Emojis.check} Tu Texto: **__${texto}__**\n${client.Emojis.check}Texto Traducido: **__${res.text}__**`
          )
          .setColor("#6666cc");
        message.lineReply(embed);
      })
      .catch((err) => {
        message.lineReply(`${client.Emojis.no_check} No se encontro el lenguaje.`);
        client.channels.cache.get('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: ${command.name},
          Error: \`\`\`${err}\`\`\`
          `);
        })
      });
  },
};
