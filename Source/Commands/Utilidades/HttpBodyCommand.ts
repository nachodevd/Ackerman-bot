//@ts-nocheck
import { Command } from "../../Base/Command";
import fetch from "node-superfetch";
import { MessageEmbed, TextChannel } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import fs from 'fs'
import path from "path";
export const command: Command = {
  category: "Utilidades",
  name: "http.body",
  aliases: ["httpbody", 'httpcontent'],
  description:
    "Con este comando se podras tener el codigo fuente de una pagina.",
  enable: true,
  onlyOwner: false,
  example: [],
  use: ["http.body <...url>"],
  run: async (client, message, args) => {
    if (!args[0]) {
      message.lineReply(
        new MessageEmbed().setColor(Discord).setDescription(`
          ${client.Emojis.no_check} No se ingreso ningun argumento.
          `)
      );
      return
    } else {
      fetch
        .get(args[0])
        .then(async (response) => {
          fs.writeFile(path.join(__dirname + '../../../Cache/http_body/body.html'), response.body.toString(), function (err) {
            if (err) return console.log(err) && message.lineReply(`⚠️ Error desconocido.`)
            message.lineReply({ files: [path.join(__dirname + '../../../Cache/http_body/body.html')] }).then((response) => {
              fs.unlinkSync(path.join(__dirname + '../../../Cache/http_body/body.html'))
              return
            })
          })
        }).catch((error) => {
          client.channels.fetch('911464171600769065').then((e) => {
            (e as TextChannel).send(`
            Error con el comando: \`${command.name}\`,
            Error: \`\`\`${error}\`\`\`
            `);
          });
          return message.lineReply(
            new MessageEmbed().setColor(Discord).setDescription(`
          ${client.Emojis.no_check} La pagina no existe o no fue encontrada. `)
          );
        });
    }
  },
};
