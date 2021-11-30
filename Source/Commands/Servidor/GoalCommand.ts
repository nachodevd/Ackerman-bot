//@ts-nocheck
import { Command } from "../../Base/Command";
import { TextChannel, MessageEmbed } from "discord.js";
import { crearDB } from "megadb";
const db = new crearDB({ carpeta: "Database", nombre: "GoalDrive" });
const db2 = new crearDB({ carpeta: "Database", nombre: "DebugChannelDrive" });
export const command: Command = {
  category: "Configuracion Del Servidor",
  name: "goal",
  aliases: ["goal-members"],
  description:
    "Con este comando podras establecer una meta de miembros que se ira actualizando a tiempo real.",
  example: ["goal create 1000"],
  use: ["goal <create|del|edit> [meta]"],
  enable: true,
  onlyOwner: false,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.lineReply(`${client.Emojis.no_check} Necesito permisos para gestionar canales.`);
    switch (args[0]) {
      case "create":
        {
          if (db.tiene(message.guild.id)) {
            message.lineReply(
              `${client.Emojis.no_check} Ya hay una meta creada, usa **${client.getConfig.prefix}goal del** para eliminarla y volverla a crear otra o **${client.getConfig.prefix}goal edit** para editar una meta ya creada.`
            );
          } else {
            return message.channel
              .send(`Ingresa una meta de miembros.`)
              .then((e) => {
                message.channel
                  .awaitMessages((m) => m.author.id == message.author.id, {
                    max: 1,
                    time: 60000,
                  })
                  .then((collected) => {
                    let numeroe = Number(collected.first().content);
                    if (isNaN(numeroe))
                      return message.lineReply(
                        `${client.Emojis.no_check} El argumento ingresado no es un numero.`
                      );
                    if (numeroe < 10)
                      return message.lineReply(
                        `${client.Emojis.check} La meta debe superar al menos los 10 miembros`
                      );
                    message.guild.channels
                      .create(`Meta: ${message.guild.memberCount}/${numeroe}`, {
                        type: "voice",
                      })
                      .then((can) => {
                        db.set(message.guild.id, {
                          meta: numeroe,
                          canal: can.id,
                        });
                        message.lineReply(
                          `${client.Emojis.check} Se creo una nueva meta, la meta es de **${numeroe}** miembros.`
                        );
                      });
                  })
                  .catch((error) => {
                    client.channels.cache.get('911464171600769065').then((e) => {
                      (e as TextChannel).send(`
                      Error con el comando: ${command.name},
                      Error: \`\`\`${error}\`\`\`
                      `);
                    })
                    message.lineReply(
                      `${client.Emojis.no_check} Se acabo el tiempo.`
                    );
                  });
              });
          }
        }
        break;
      case "del":
        {
          let debug_channel;
          if (db2.tiene(message.guild.id))
            debug_channel = await db2.get(message.guild.id);
          if (db.tiene(message.guild.id)) {
            try {
              const canal = await db.get(`${message.guild.id}.canal`);
              message.guild.channels.cache
                .get(canal)
                .delete()
                .then((e) => {
                  db.eliminar(message.guild.id);
                  message.lineReply(
                    `${client.Emojis.check} Elimine la meta.`
                  );
                });
            } catch (error) {
              let embed = new MessageEmbed()
                .setDescription(
                  `
                Nuevo error! \`Goal\`

                No se pudo eliminar la meta.

                Error:\`\`\`\n${error}\n\`\`\`
                `
                )
                .setColor("RED");
              client.channels.cache.get('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                  Error con el comando: ${command.name},
                  Error: \`\`\`${error}\`\`\`
                  `);
              })
              try {
                (
                  message.guild.channels.cache.get(debug_channel) as TextChannel
                ).send(embed);
              } catch (error) {
                return;
              }
            }
          } else {
            message.lineReply(
              `${client.Emojis.no_check} No hay una meta creada. Usa **${client.getConfig.prefix}goal create** para crear una.`
            );
          }
        }
        break;
      case "edit":
        {
          if (!db.tiene(message.guild.id))
            return message.lineReply(
              `${client.Emojis.no_check} No hay una meta creada. Usa **${client.getConfig.prefix}goal create** para crear una.`
            );
          const canal = await db.get(`${message.guild.id}.canal`);
          return message.channel
            .send(`Ingresa una meta de miembros.`)
            .then((collected) => {
              message.channel
                .awaitMessages((m) => m.author.id == message.author.id, {
                  max: 1,
                  time: 60000,
                })
                .then((collected) => {
                  let numeroe = Number(collected.first().content);
                  if (isNaN(numeroe))
                    return message.lineReply(
                      `${client.Emojis.no_check} El argumento ingresado no es un numero.`
                    );
                  message.guild.channels.cache.get(canal).edit({
                    name: `Meta: ${message.guild.memberCount}/${numeroe}`,
                  });
                  db.set(message.guild.id, { meta: numeroe, canal: canal });
                  message.lineReply(
                    `${client.Emojis.check} Se edito la meta, ahora es de **${numeroe}** miembros.`
                  );
                })
                .catch((error) => {
        client.channels.fetch('911464171600769065').then((e) => {
          (e as TextChannel).send(`
          Error con el comando: \`${command.name}\`,
          Error: \`\`\`${error}\`\`\`
          `);
        });
                  message.lineReply(
                    `${client.Emojis.no_check} Se acabo el tiempo.`
                  );
                });
            });
        }
        break;
      default:
        message.lineReply(
          `${client.Emojis.no_check} Esa opcion no es correcta. Las opciones habiles son: **${client.getConfig.prefix}goal del** para eliminar la meta actual, **${client.getConfig.prefix}goal create** para crear una meta o **${client.getConfig.prefix}goal edit** para editar la meta.`
        );
    }
  },
};
