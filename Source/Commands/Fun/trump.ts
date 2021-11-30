//@ts-nocheck
import { MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";
import { Discord } from "../../Util/Colors.json";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "trump",
  aliases: [],
  description:
    "Con este comando podras redactar un tweet en el perfil de Trump.",
  example: ["trump xd"],
  use: ["trump <texto>"],
  category: 'Diversion',
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("ATTACH_FILES"))
      return message.lineReply(
        "Necesito permisos para mandar archivos."
      );
    if (!args.join(" "))
      return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`${client.Emojis.no_check} No se ingreso ningun texto.`))
    let tweet = args.join(" ");
    if (tweet.length > 68) tweet = tweet.slice(0, 65) + "...";
    try {
      const res = await fetch(
        "https://nekobot.xyz/api/imagegen?type=trumptweet&text=" + tweet
      );
      const img = (await res.json()).message;
      let embed = new MessageAttachment(img, "a.jpg");
      await message.lineReplyNoMention(embed);
    } catch (err) {
       message.lineReply(`⚠️ Error desconocido.`)
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        return
    }
  },
};
