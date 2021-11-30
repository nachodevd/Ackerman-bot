//@ts-nocheck
import { Command } from "../../Base/Command";
import { crearDB } from "megadb";
const db = new crearDB({ carpeta: "Database", nombre: "WelcomeRolesDrive" });
export const command: Command = {
  category: "Configuracion Del Servidor",
  name: "auto-role",
  aliases: ["join-role"],
  description:
    "Con este comando podras establecer un rol para cuando alguien se una.",
  example: ["join-role set @No verificado"],
  use: ["join-role <set|del> [rol:id|mencion]"],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.lineReply(
      `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
    );
    switch (args[0]) {
      case "set":
        {
          let rol =
            message.mentions.roles.first() ||
            message.guild.roles.cache.get(args[1]);
          if (!rol)
            return message.lineReply("```\n" + `${command.use}` + "\n```");
          db.set(message.guild.id, rol.id);
          message.lineReply(
            `${client.Emojis.check} Estableci ${rol.name} como el rol que se dara cuando un usuario se una.`
          );
        }
        break;
      case "del":
        {
          if (db.tiene(message.guild.id)) {
            db.eliminar(message.guild.id);
            message.lineReply(
              `${client.Emojis.check} Elimine el rol de bienvenida.`
            );
          } else {
            message.lineReply(
              `${client.Emojis.no_check} No hay ningun rol establecido.`
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
