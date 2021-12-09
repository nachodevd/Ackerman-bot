//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed } from "discord.js";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
  name: "avatar",
  description: "Mira el avatar de cualquier persona en discord.",
  aliases: ["av"],
  category: "Utilidades",
  enable: true,
  onlyOwner: false,
  example: [],
  use: ["av [id::mencion]"],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    let member = message.mentions.users.first();
    if (member) {
      let embed = new MessageEmbed()
        .setImage(
          member.displayAvatarURL({ dynamic: true, size: 2048, format: "png" })
        )
        .setColor(Discord);
      return message.lineReply(embed);
    } else {
      if (args[0]) {
        let member = (await client.users.fetch(args[0])) || message.author;
        if (member) {
          let embed = new MessageEmbed()
            .setImage(
              member.displayAvatarURL({
                dynamic: true,
                size: 2048,
                format: "png",
              })
            )
            .setColor(Discord);
          return message.lineReply(embed);
        }
      } else {
        let member = message.author;
        if (member) {
          let embed = new MessageEmbed()
            .setImage(
              member.displayAvatarURL({
                dynamic: true,
                size: 2048,
                format: "png",
              })
            )
            .setColor(Discord);
          return message.lineReply(embed).catch(() =>{
            return message.lineReply(`⚠️ Error desconocido.`)
          });
        }
      }
    }
  },
};
