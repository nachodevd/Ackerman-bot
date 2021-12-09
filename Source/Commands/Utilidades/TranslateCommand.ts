//@ts-nocheck
import translate from "@vitalets/google-translate-api";
import { MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "traductor",
  aliases: ["translate"],
  description: "Con este comando podras traducir texto al idioma que elijas.",
  example: ["translate Japanese hola como andas"],
  use: ["translate <idioma> <texto>"],
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
      
      ||translate **<idioma>** <texto>||
      `))
    const texto = args.slice(1).join(" ");
    if (!texto)
      return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
    ${client.Emojis.no_check} Falta de argumentos.
    
    ||translate <idioma> **<texto>**||
    `))
    translate(`${texto}`, {to:`${idioma}`, from:`auto`}).then((response) =>{
      return message.lineReply(`Tu texto traducido: **${response.text}**\nPronunciacion:**${response.pronunciation}**`)
    }).catch((error) =>{client.channels.fetch('911464171600769065').then((e) => {
      (e as TextChannel).send(`
      Error con el comando: \`${command.name}\`,
      Error: \`\`\`${error}\`\`\`
      `);
  });
      return message.lineReply(`⚠️ Error desconocido.`)
    })
  },
};
