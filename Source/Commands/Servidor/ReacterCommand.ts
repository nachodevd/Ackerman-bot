//@ts-nocheck
import { Command } from "../../Base/Command";
import { TextChannel, MessageEmbed } from "discord.js";
import { crearDB } from "megadb";
const goodbye = new crearDB({
  carpeta: "Database",
  nombre: "ReacterGuildsDrive",
});
export const command: Command = {
  category: "Configuracion Del Servidor",
  name: "bye-react",
  aliases: [],
  description:
    "Con este comando podras hacer que el bot reaccione en el ultimo mensaje de un miembro cuando se vaya. Si el miembro nunca mando un mensaje simplemente se mandara un embed diciendo que se fue.",
  example: ["bye-react active"],
  use: ["bye-react <active|disable|channel:id|mencion>"],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
      );
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    switch (args[0]) {
      case "active":
        {
          if (goodbye.tiene(message.guild.id)) {
            return message.lineReply(
              `${client.Emojis.check} La despedida por reaccion ya esta activada.`
            );
          } else {
            goodbye.set(message.guild.id, true);
            message.lineReply(
              `${client.Emojis.check} Se activo la despedida por reaccion.`
            );
          }
        }
        break;
      case "disable":
        {
          if (!goodbye.tiene(message.guild.id)) {
            return message.lineReply(
              `${client.Emojis.no_check} La despedida por reaccion ya esta desactivada.`
            );
          } else {
            goodbye.eliminar(message.guild.id, true);
            message.lineReply(
              `${client.Emojis.check} Se desactivo la despedida por reaccion.`
            );
          }
        }
        break;
      case `${channel}`: {
        goodbye.set(message.guild.id, channel.id);
        return message.lineReply(
          `${client.Emojis.check} Se establecio ${channel} como el canal donde llegaran las personas que se vayan.`
        );
      }
      default: {
        message.lineReply(
          `${client.Emojis.no_check} Las opciones disponibles son: **active** para activar el comando o **disable** para desactivar el comando.`
        );
      }
    }
  },
};
