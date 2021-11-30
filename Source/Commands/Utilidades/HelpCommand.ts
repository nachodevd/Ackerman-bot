//@ts-nocheck

import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
  name: "help",
  category: "Utilidades",
  description:
    "Con este comando podras obtener informacion sobre comandos o todos los comandos que existen hasta el momento.",
  aliases: ["commands", "comandos"],
  enable: true,
  example: [],
  onlyOwner: false,
  use: [],
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS"))
      return message.lineReply(client.permisos.bot.embed);
    const cmd = client.getCommand.get(args[0]) || client.getAlias.get(args[0]);
    if (!args[0])
      return message.lineReply(
        new MessageEmbed()
          .setDescription(
            `
            <:mod:882037932523925514> Moderacion (${client.getCommand.filter(({ category }) => category === 'Moderacion').size})
        ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Moderacion")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
        <:util:865027700007501824> Utilidades (${client.getCommand.filter(({ category }) => category === 'Utilidades').size})
        ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Utilidades")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
        <:info:865027701002076170> Informativo (${client.getCommand.filter(({ category }) => category === 'Informativo').size})
        ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Informativo")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
        🔖 Configuracion Del Servidor (${client.getCommand.filter(({ category }) => category === 'Configuracion Del Servidor').size})
        ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Configuracion Del Servidor")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
         <a:uhlala:820722264370446343> Economia (${client.getCommand.filter(({ category }) => category === 'Economia').size})
        ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Economia")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
          <:me:820730443342020649> Diversion - Manipulacion de Imagenes (${client.getCommand.filter(({ category }) => category === 'Diversion').size})
            ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Diversion")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
            <:opinion:909145225602170911> Sugerencias (${client.getCommand.filter(({ category }) => category === 'Sugerencias').size})
            ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Sugerencias")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
            <:level:913952867986055218> Niveles - Configuracion ${client.getCommand.filter(({ category }) => category === 'Niveles').size})
            ${"`" +
            client.getCommand
              .filter(({ category }) => category === "Niveles")
              .map(({ name }) => name.toString().toLowerCase())
              .join(", ") +
            "`"
            }
        `
          )
          .setFooter(
            `Para obtener ayuda mas completa ingresa ${client.getConfig.prefix}help <comando>`
          )
          .setColor(Discord)
      );
    else if (!cmd)
      return message.lineReply(
        new MessageEmbed()
          .setColor(Discord)
          .setDescription(
            `Ese nombre o alias de comando no fue encontrado.\n<:tip:865027701002076170> Recuerda que puedes buscar por alias tambien.`
          )
      );
    else {
      const embed = new MessageEmbed().setColor(Discord).setDescription(`
        **${cmd.name}**
        ${cmd.description}
        `).addField('Categoria:', cmd.category, true).addField('Estado:', cmd.enable === true ? "Habilitado." : "Deshabilitado.", true).addField('Habilitado solo para owner:', cmd.onlyOwner === true ? "Si." : "No.", true);
      if (cmd.aliases.length) embed.addField('Aliases:', `\`\`\`${cmd.aliases.join(", ")}\`\`\``, true)
      if (cmd.use?.length) embed.addField('Uso:', `\`\`\`${cmd.use}\`\`\``)
      if (cmd.example?.length) embed.addField('Ejemplo de uso:', `\`\`\`${cmd.example}\`\`\``)
      return message.lineReply(embed)
    }
    /*
     * return message.lineReply(
      new MessageEmbed().setColor(Discord).setDescription(`
  ➥ Informacion principal.
  > Nombre principal: \`${cmd.name}\`
  > Aliases: ${`\`${cmd.aliases?.length
          ? cmd.aliases.join(", ")
          : "Este comando no cuenta con ningun alias."
        }\``}
  > Descripcion: ${`\`${cmd.description}\``}
  ➥ Detallado.
  > Modo de uso: ${`\`${cmd.use?.length ? cmd.use.join(" ") : "Este comando se ejecuta de una."
        }\``}
  > Ejemplo de uso: ${`\`${cmd.example?.length
          ? cmd.example.join(" ")
          : "Este comando se ejecuta de una."
        }\``}
  > Estado: \`${cmd.enable === true ? "Habilitado." : "Deshabilitado."}\`
  > Solo Owner: \`${cmd.onlyOwner === true ? "Si." : "No."}\`
    `)
    */
  },
};
