//@ts-nocheck
import path from "path";
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
    if (!args[0]) {
      message.author.send(new MessageEmbed()
        .setDescription(`
         <:mod:882037932523925514> **Moderacion**
     
         ${client.getCommand.filter(({ category }) => category === "Moderacion").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
         
         <:util:865027700007501824> **Utilidades**
         
         ${client.getCommand.filter(({ category }) => category === "Utilidades").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
     
         <:info:865027701002076170> **Informativo**
     
         ${client.getCommand.filter(({ category }) => category === "Informativo").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
     
         🔖 **Configuracion Del Servidor**
         
         ${client.getCommand.filter(({ category }) => category === "Configuracion Del Servidor").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
     
         <a:uhlala:820722264370446343> **Economia**
     
         ${client.getCommand.filter(({ category }) => category === "Economia").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}

         **Para empezar a usar la economia debes de trabajar por primera vez.**
         `).setColor(Discord)).then(() => { message.react(client.Emojis.check) }).catch(() => {
          message.lineReply(`${client.Emojis.no_check} No pude mandarte mensajes porque no tienes habilitados los mensajes directos.`, { files: [path.join(__dirname + '../../../Util/Images/invite.gif')] })
          return
        })
      message.author.send(new MessageEmbed().setDescription(`
         <:opinion:909145225602170911> **Sugerencias**
     
         ${client.getCommand.filter(({ category }) => category === "Sugerencias").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
     
         <:me:820730443342020649> **Diversion - Manipulacion de Imagenes**
     
         ${client.getCommand.filter(({ category }) => category === "Diversion").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
         
         <:level:913952867986055218> **Niveles**
     
         **Para empezar a usar este, debes de establecer un canal.**

         ${client.getCommand.filter(({ category }) => category === "Niveles").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}

        👋 **Bienenida (Imagen)**
     
        **Para empezar a usar este, debes de establecer un canal.**

         ${client.getCommand.filter(({ category }) => category === "Bienvenida").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}
     
         😎 **Roles**

         ${client.getCommand.filter(({ category }) => category === "Roles").map(({ name, description }) => `**${name}**: ${description}`.toString()).join("\n")}

         **Extras:**
     
         Cuando en el modo de uso se indique: **<>**, significara que ese parametro es 100% neccesario.
         Cuando en el modo de uso se indique: **[]**, significara que ese opcional.
     
         Puedes usar **.help <comando>** para obtener informacion extra sobre el comando ingresado.
         `).setColor(Discord)).then(() => { message.react(client.Emojis.check) }).catch(() => {
        return
      })
      return
    }
    const cmd = client.getCommand.get(args[0]) || client.getAlias.get(args[0]);
    if (!cmd)
      return message.lineReply(
        new MessageEmbed()
          .setColor(Discord)
          .setDescription(
            `Ese nombre o alias de comando no fue encontrado.\n<:tip:865027701002076170> Recuerda que puedes buscar por alias tambien.`
          )
      )
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
  },
};
