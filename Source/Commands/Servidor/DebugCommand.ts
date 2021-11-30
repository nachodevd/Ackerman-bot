//@ts-nocheck
import { Command } from "../../Base/Command";
import { crearDB } from "megadb";
import { TextChannel } from "discord.js";
const DebugDB = new crearDB({
  carpeta: "Database",
  nombre: "DebugChannelDrive",
});

export const command: Command = {
  category: "Configuracion Del Servidor",
  name: "debug-channel",
  aliases: ["debug-ch", "debug"],
  description:
    "Con este comando podras establecer el canal donde se mostraran los errores que ocurran con el bot.",
  example: ["debug #debug-shidori"],
  use: ["debug <set|del|create> [canal:mencion|id]"],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `Necesitas permisos para gestionar el servidor.`
      );
    let opcion = args[0];
    if (!opcion)
      return message.lineReply("```\n" + `${command.use}` + "\n```");
    switch (opcion) {
      case "set":
        {
          let canal =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[1]);
          if (!canal)
            return message.lineReply("```\n" + `${command.use}` + "\n```");
          if (!(canal as TextChannel))
            return message.lineReply(
              `${client.Emojis.no_check} El canal debe ser de tipo \`Texto\`.`
            );
          if (!canal.viewable)
            return message.lineReply(
              `${client.Emojis.no_check} El canal no es visible.`
            );
          if (!message.guild.channels.cache.get(canal.id))
            return message.lineReply(
              `${client.Emojis.no_check} El canal no forma parte de este servidor.`
            );
          DebugDB.set(message.guild.id, canal.id);
          message.lineReply(
            `${client.Emojis.check} Estableci ${canal.name} como el canal donde llegaran los errores del bot.`
          );
        }
        break;
      case "create":
        {
          if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
            return message.lineReply(
              `Necesito permisos para crear canales.`
            );
          if (DebugDB.tiene(message.guild.id)) {
            return message.lineReply(
              `${client.Emojis.no_check} Ya se creo un canal o ya se establecio un canal. Use **${client.getConfig.prefix}debug del** para eliminar del registro el canal establecido.`
            );
          }
          message.guild.channels
            .create(`debug-${client.user.username}`, {
              type: "text",
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: message.author.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ],
            })
            .then((e) => {
              DebugDB.set(message.guild.id, e.id);
              message.lineReply(
                `${client.Emojis.check} Se hizo el canal ${e} y se establecio ese mismo.`
              );
            });
        }
        break;
      case "del":
        {
          if (DebugDB.tiene(message.guild.id)) {
            DebugDB.eliminar(message.guild.id);
            message.lineReply(
              `${client.Emojis.check} Elimine el canal de debug.`
            );
          } else {
            message.lineReply(
              `${client.Emojis.no_check} No hay ningun canal establecido.`
            );
          }
        }
        break;
      default:
        message.lineReply(
          `${client.Emojis.no_check} Esa opcion no es correcta.`
        );
    }
  },
};
