//@ts-nocheck
import { Command } from "../../Base/Command";
import translate from "@vitalets/google-translate-api";
import { TextChannel } from "discord.js";
export const command: Command = {
  name: "ban",
  aliases: [],
  category: "Moderacion",
  description: "Con este comando podras banear gente",
  enable: true,
  onlyOwner: false,
  example: ["ban 1234567891234567"],
  use: ["ban <id::mencion> [razon] [--7days]"],
  run: async (client, message, args) => {
    let member,
      reason = args.slice(1).join(" ") || "No se ingreso una razon.",
      day7;
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.lineReply(client.permisos.bot.ban);
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.lineReply(client.permisos.miembro.ban);
    if (args[0])
      member =
        message.mentions.members.first() ||
        (await client.users.fetch(args[0]))
    else
      return message.lineReply(
        client.Emojis.no_check + ` No se ingreso un miembro.`
      );
    if (member.id == message.member.id)
      return message.lineReply(
        client.Emojis.no_check + ` No te puedes auto banear.`
      );
    if (member.id == client.user.id)
      return message.lineReply(
        client.Emojis.no_check + ` No me puedo auto banear.`
      );
    if (args.join(" ").endsWith("--7days")) day7 = true;
    else day7 = false;
    if (day7 === true) {
      message.guild.members.ban(member.id, { days: 7, reason: reason })
      member
        .then(() => {
          message.react(client.Emojis.check);
        })
        .catch((error) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
          //traductor
          translate(`${error}`.slice(17), {
            to: "es",
          }).then((response) => {
            message.lineReply(
              client.Emojis.no_check +
              ` No pude banear al miembro correctamente debido al siguiente error \`${response}\`.`
            );
          });
          return;
        });
    } else {
      message.guild.members.ban(member.id, { days: 7, reason: reason })
        .then(() => {
          message.react(client.Emojis.check);
        })
        .catch(async (error) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
          translate(`${error}`.slice(17), {
            to: "es",
          }).then((response) => {
            message.lineReply(
              client.Emojis.no_check +
              ` No pude banear al miembro correctamente debido al siguiente error \`${response}\`.`
            );
          });
          return;
        });
    }
  },
};
