//@ts-nocheck
import { TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "clear",
  aliases: ["purge", "clean"],
  category: "Moderacion",
  enable: true,
  onlyOwner: false,
  description:
    "Con este comando podras borrar mensajes de un miembro o mensajes de un canal.",
  example: ["purge 834501260937920592 500"],
  use: ["purge [miembro:id|mencion] <cantidad-de-mensajes:numero>"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(
        client.Emojis.no_check + "Necesitas permisos para gestionar mensajes."
      );
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(
        client.Emojis.no_check + "Necesito permisos para gestionar mensajes."
      );
    let member =
      message.mentions.members.first() ||
      message.guild.members.resolve(args[0]);
    if (member) {
      let c = args[1];
      if (!c) return message.lineReply("```\n" + `${command.use}` + "\n```");
      let nc = Number(c);
      if (isNaN(nc))
        return message.lineReply(
          `${client.Emojis.no_check} El monto debe ser un numero.`
        );
      if (nc > 100)
        return message.lineReply(
          `${client.Emojis.no_check} El monto no debe ser mayor a 100.`
        );
      if (nc < 1)
        return message.lineReply(
          `${client.Emojis.no_check} El monto no debe ser menor a 1.`
        );
      message.channel.messages.fetch({ limit: nc }).then((e) => {
        const user = e.filter((x) => x.author.id === member.id);
        (message.channel as TextChannel).bulkDelete(user);
      });
    } else {
      let cantidad = args[0];
      if (!cantidad)
        return message.lineReply("```\n" + command.use + "\n```");
      let amount = parseInt(cantidad);
      if (isNaN(amount))
        return message.lineReply(
          `${client.Emojis.no_check} La cantidad debe ser un numero.`
        );
      if (amount < 3)
        return message.lineReply(
          `${client.Emojis.no_check} Podes borrar ${cantidad} vos mismo.`
        );
      try {
        for (let i = 0; i < Math.ceil(amount / 99); i++) {
          const msgs = await message.channel.messages.fetch({
            limit: Math.round(amount / Math.ceil(amount / 99)),
          });
          await (message.channel as TextChannel).bulkDelete(
            msgs.filter((m) => m.deletable)
          );
        }
      } catch (error) {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
        return message.lineReply(
          `${client.Emojis.check} No puedo borrar mensajes con 2 semanas de antiguedad.`
        );
      }
    }
  },
};
