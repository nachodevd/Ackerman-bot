//@ts-nocheck
import { Command } from "../../Base/Command";
import WarnModel from "../../Models/WarnModel";
import { TextChannel } from "discord.js";
import { connect } from "mongoose";
export const command: Command = {
  name: "warn",
  description:
    "Con este comando podras warnear gente cada vez que haga algo mal o incumpla una regla.",
  aliases: ["w", "infraction", "infraccion", "advert", "advertencia"],
  example: ["warn 624320717571227658"],
  use: ["warn <miembro:mencion|id>"],
  onlyOwner: false,
  category: 'Moderacion',
  enable: true,
  run: async (client, message, args) => {
    connect(client.getConfig.mongo+"Warn").catch((res) =>{return})
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `Necesitas permisos para gestionar el servidor.`
      );
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.lineReply(`Necesito permisos para banear gente.`);
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return message.lineReply("```\n" + `${command.use}` + "\n```");
    let user = await WarnModel.findOne({
      User: member.id,
      Guild: message.guild.id,
    });
    if (!user) {
      let a = new WarnModel({
        User: member.id,
        Guild: message.guild.id,
        Warns: 1,
      });
      message.react(client.Emojis.check);
      await a.save().catch((err) => console.error(`[MongoDB-Error]${err}`));
    } else {
      if (parseInt(user.Warns) >= 4) {
        member
          .ban({ reason: "Alcanzar las sanciones maximas." })
          .then(() => {
            message.lineReply(
              `Banee a **${member.displayName}** porque excedio los maximos warns que son posibles tener.`
            );
          })
          .catch(async (error) => {
            client.channels.cache.get('911464171600769065').then((e) => {
              (e as TextChannel).send(`
              Error con el comando: ${command.name},
              Error: \`\`\`${error}\`\`\`
              `);
            })
            message.lineReply(
              `El miembro alcanzo los maximos warns que se puede tener, pero no se lo pudo banear.\nSe agregó un warn más a **${member.displayName}** y continuará así hasta que sea posible banear.`
            );
            let sanciones = user.Warns + 1;
            user.Warns = sanciones;
            await user
              .save()
              .catch((err) => {
                client.channels.cache.get('911464171600769065').then((e) => {
                  (e as TextChannel).send(`
                Error con el comando: ${command.name},
                Error: \`\`\`${error}\`\`\`
                `);
                });
                console.error(`[MongoDB-Error]${err}`)
              });
            return;
          });
      } else {
        let sanciones = user.Warns + 1;
        user.Warns = sanciones;
        message.react(client.Emojis.check);
        await user
          .save()
          .catch((err) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
            console.error(`[MongoDB-Error]${err}`)
          });
      }
    }
  },
};
