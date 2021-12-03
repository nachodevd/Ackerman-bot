//@ts-nocheck

import { Command } from "../../Base/Command";
import fetch from "request";
import { MessageEmbed, TextChannel } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { replaceLength, haveAndReplace } from "../../Util/extensions";
export const command: Command = {
  category: "Utilidades",
  name: "http.status",
  aliases: ['httpstatus'],
  description:
    "Con este comando se podra ver en que estado se encuentra una pagina.",
  enable: true,
  onlyOwner: false,
  example: [],
  use: ["http.code <...url>"],
  run: async (client, message, args) => {
    if (!args[0])
      return message.lineReply(
        new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} No se ingreso ningun argumento.
        `)
      );
    if (!args[0].includes("http://www.")) {
      return message.lineReply(
        new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} Los argumentos deben serguir este patron: **http://www.<...url>?.com** por ejemplo **http://www.youtube.com** o **http://www.youtube.com/watch?v=...**.
        `)
      );
    }
    fetch
      .get(args[0])
      .then(async (response) => {
        message.lineReply(
          new MessageEmbed().setColor(Discord).setDescription(`
        Estado: **${response.status}**
        Texto de estado: **${response.statusText}**
        `)
        );
      })
      .catch((error) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        message.lineReply(
          new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} La pagina no existe o no fue encontrada. `)
        );
      });
  },
};
