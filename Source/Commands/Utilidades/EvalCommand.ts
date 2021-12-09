//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
export const command: Command = {
  category: "Utilidades",
  name: "eval",
  aliases: ["dev", "exec"],
  description: "Con este comando se podra evaluar codigo.",
  enable: true,
  onlyOwner: true,
  example: [],
  use: [],
  run: async (client, message, args) => {
    if (message.author.id !== '624320717571227658') return;
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    if (!args[0])
      return message.lineReply(
        client.Emojis.no_check + " Ingresa el codigo para evaluar"
      );
    const embed = new MessageEmbed().addField(
      "Code",
      `\`\`\`ts\n${args.join(" ")}\`\`\``
    );
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      let type = typeof code;

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });
      embed
        .addField("Resultado", `\`\`\`ts\n${clean(evaled)}\`\`\``)
        .setColor("GREEN")
        .addField("Tipo", `\`\`\`\n${type}\`\`\``, true)
        .addField(
          "Tiempo",
          `\`\`\`fix\n${message.createdTimestamp - Date.now()} ms\`\`\``,
          true
        );
      message.lineReply(embed).catch(() =>{
        return message.lineReply(`⚠️ Error desconocido.`)
      });
    } catch (err) {
      embed
        .addField("Resultado", `\`\`\`ts\n${clean(err)}\`\`\``)
        .setColor("RED")
        .addField("Tipo", `\`\`\`\n${typeof err}\`\`\``, true)
        .addField(
          "Tiempo",
          `\`\`\`fix\n${message.createdTimestamp - Date.now()} ms\`\`\``,
          true
        );
      message.lineReply(embed).catch(() =>{
        return message.lineReply(`⚠️ Error desconocido.`)
      });;
    }
  },
};
