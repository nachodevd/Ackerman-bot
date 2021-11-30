//@ts-nocheck
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
import path from "path";
export const command: Command = {
  name: "invite",
  aliases: [],
  description: "Con este comando me podras invitar a tu server.",
  example: [],
  use: [],
  category: "Utilidades",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    let inv = new MessageEmbed()
      .setColor("#6666cc")
      .setDescription(
        `Hola, yo soy ${
          client.user.username
        }, un bot multifuncional en estado de desarrollo. Mi creador es **${
          client.users.cache.get("624320717571227658").tag
        }**. Para meterme a un servidor hace click en algunos de los dos textos en azul. [Con permisos normales](https://discord.com/api/oauth2/authorize?client_id=${
          client.user.id
        }&permissions=137707777271&scope=bot)/[Recomendable (con permisos de administrador para evitar bugs)](https://discord.com/api/oauth2/authorize?client_id=${
          client.user.id
        }&permissions=8&scope=bot)`
      );
    if (args[0] === "pls-guild") {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.lineReply(client.permisos.miembro.manage_g);
      if (!message.guild.me.hasPermission("EMBED_LINKS"))
        return message.lineReply(client.permisos.bot.embed);
      message.lineReply(inv);
    } else {
      try {
        message.member.send(inv).catch((e) => {
          message.lineReply(
            client.Emojis.no_check +
              ` No puedo enviarte mensajes, para evitar esto haz lo siguiente.`,
            {
              files: [
                path.join(
                  __dirname,
                  "..",
                  "..",
                  "Util",
                  "Images",
                  "invite.gif"
                ),
              ],
            }
          );
          return;
        });
        require("../../Util/Images");
      } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        return;
      }
    }
  },
};
