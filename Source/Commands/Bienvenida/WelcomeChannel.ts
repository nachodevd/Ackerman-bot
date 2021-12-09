//@ts-nocheck
import { Command } from "../../Base/Command";
import { connect } from "mongoose";
import WelcomeModel from "../../Models/WelcomeModel";
import { join } from "path";
export const command: Command = {
  name: "welcome-channel",
  aliases: ['wch'],
  description: "Con este comando podras administrar un canal donde llegaran las bienvenidas.",
  example: [],
  category: "Bienvenida",
  enable: true,
  onlyOwner: false,
  use: ["wch <mode> <channel?>"],
  run: async (client, message, args) => {
    connect(client.getConfig.mongo + "Welcome").catch((res) => { return })

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
      );
    if (!args[0]) return message.lineReply(
      `${client.Emojis.no_check} Necesitas ingresar un modo, modos: get, set, delete.`
    );
    switch (args[0]) {
      case 'set': {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if (!channel) return message.lineReply(
          `${client.Emojis.no_check} Debes de ingresar un canal, ya sea mencion o ID.`
        );
        const newSchema = await WelcomeModel.findOne({
          Guild: message.guild.id,
          WelcomeChannel: channel.id
        })
        if(!channel.manageable) return message.lineReply(
          `${client.Emojis.no_check} No puedo ver o administrar ese canal.`
        );
        if(channel.isText() === false) return message.lineReply(
          `${client.Emojis.no_check} No puedo ver o administrar ese canal.`
        );
        if (newSchema) {
          newSchema.WelcomeChannel = channel.id
          newSchema.ImageURL = join(__dirname+'..', '..', '..', '/Util/Images/bgwel.png')
          newSchema
            .save().then(() => {
              message.lineReply(`${client.Emojis.check} Se actualizo el canal a **${channel.name}**`)
            })
            .catch((error) => {
              client.channels.cache.get('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                  Error con el comando: ${command.name},
                  Error: \`\`\`${error}\`\`\`
                  `);
              });
              console.error(`[MongoDB-Error]${error}`)
            })
        } else {
          new WelcomeModel({
            Guild: message.guild.id,
            WelcomeChannel: channel.id,
            ImageURL: join(__dirname+'..', '..', '..', '/Util/Images/bgwel.png')
          }).save().then(() => {
            message.lineReply(`${client.Emojis.check} Se establecio el canal de bienvenida a **${channel.name}**`)
          })
            .catch((err) => {
              client.channels.cache.get('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                  Error con el comando: ${command.name},
                  Error: \`\`\`${error}\`\`\`
                  `);
              });
              console.error(`[MongoDB-Error]${err}`)
            })
        }
      }; break;
      case 'get': {
        const newSchema = await WelcomeModel.findOne({
          Guild: message.guild.id,
        })
        if (newSchema) {
          return message.lineReply(`${client.Emojis.check} El canal establecido de bienvenida es **${'<#' + newSchema.WelcomeChannel + '>'}**`)
        } else {
          return message.lineReply(`${client.Emojis.no_check} No se establecio ningun canal para las bienvenidas.`)
        }
      }; break;
      case 'delete': {
        WelcomeModel.findOneAndDelete({
          Guild: message.guild.id,
        }).then((res) => {
          return message.lineReply(`${client.Emojis.check} Se elimino de la base de datos el canal a donde llegaran las personas que ingresen al servidor.`)
        }).catch((error) => {
          client.channels.cache.get('911464171600769065').then((e) => {
            (e as TextChannel).send(`
                Error con el comando: ${command.name},
                Error: \`\`\`${error}\`\`\`
                `);
          });
          console.error(`[MongoDB-Error]${err}`)
        })
        return message.lineReply(`${client.Emojis.no_check} No se pudo eliminar de la base de datos el canal.`)
      }; break
    }
  }
}