//@ts-nocheck
import { MessageEmbed, Util, TextChannel } from "discord.js";
import { Command } from "../../Base/Command";
export const command: Command = {
  name: "multi-ban",
  aliases: ["mban"],
  description:
    "Con este comando podras banear a muchos miembros sin tener que ejecutar tantos comandos.",
  example: [
    "mban 813430531576168458 688969717213691957 478645105905893397 ...",
  ],
  use: ["mban [id]"],
  category: "Moderacion",
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.lineReply(
        client.Emojis.no_check + "Necesitas permisos para banear miembros."
      );
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.lineReply(
        client.Emojis.no_check + "Necesito permisos para banear miembros."
      );
    if (!args[0])
      return message.lineReply("```\n" + `${command.use}` + "\n```");
    let bans_id = [];
    let no_bans_id = [];
    let bans_nan = 0;
    let no_bans_nan = 0;
    let hm_bans_nan = 0;
    let hm_bans_id = [];
    message.channel
      .send(`<a:procesando:887091520803573780> Procesando baneos.`)
      .then(async (x) => {
        for (const id of args) {
          if (!id)
            return message.lineReply("```\n" + `${command.use}` + "\n```");
          if (id) {
            await Util.delayFor(900); //900 default pls

            if ((await message.guild.fetchBans()).get(id)) {
              hm_bans_id.push(`[${hm_bans_nan}]:${id}`);
              hm_bans_nan++;
            } else {
              message.guild.members
                .ban(id)
                .then(() => {
                  bans_id.push(`[${bans_nan}]:${id}`);
                  bans_nan++;
                })
                .catch((error) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
                  no_bans_id.push(`[${no_bans_nan}]:${id}`);
                  no_bans_nan++;
                  return;
                });
            }
          }
        }
        let yb = bans_id.length ? bans_id.join(" \n") : "No se baneo a nadie.";
        let nb = no_bans_id.length
          ? no_bans_id.join(" \n")
          : "No hubo inconvenientes de baneo.";
        let hb = hm_bans_id.length
          ? hm_bans_id.join(" \n")
          : "No habia nadie que ya este baneado";
        let embed = new MessageEmbed()
          .setColor("GREEN")
          .addField(
            "Ya baneados anteriormente",
            `
            \`\`\`md\n${hb}\`\`\`
        `
          )
          .addField(
            "No se pudo banear",
            `
            \`\`\`md\n${nb}\`\`\`
        `
          )
          .addField(
            "Se pudo banear",
            `
            \`\`\`md\n${yb}\`\`\`
        `
          );
        x.edit(
          `<a:procesando:887091520803573780> Procesando e imprimiendo baneos.`
        );
        setTimeout(() => {
          x.edit("Resultados:", { embed: embed }).catch((e) => {
            x.delete();
            let embed1 = new MessageEmbed().setColor("YELLOW").addField(
              "Ya baneados anteriormente",
              `
                    \`\`\`md\n${hb}\`\`\`
            `
            );
            let embed2 = new MessageEmbed().setColor("GREEN").addField(
              "Se pudo banear",
              `
                    \`\`\`md\n${yb}\`\`\`
                    `
            );
            let embed3 = new MessageEmbed().setColor("RED").addField(
              "No se pudo banear",
              `
                    \`\`\`md\n${nb}\`\`\`
                    `
            );
            message.lineReply(embed1).catch(() => {
              message.lineReply(`\`\`\`md\n${hb}\`\`\``);
            });
            message.lineReply(embed2).catch(() => {
              message.lineReply(`\`\`\`md\n${yb}\`\`\``);
            });
            message.lineReply(embed3).catch(() => {
              message.lineReply(`\`\`\`md\n${nb}\`\`\``);
            });
          });
        }, 3000);
      });
  },
};
