//@ts-nocheck
import { Command } from "../../Base/Command";
import { connect } from "mongoose";
import LevelModel from "../../Models/LevelModel";
export const command: Command = {
  name: "level-channel",
  aliases: ['lch'],
  description: "Con este comando podras administrar un canal donde llegaran las subidas de nivel.",
  example: ["lch #Canal"],
  category: "Niveles",
  enable: true,
  onlyOwner: false,
  use: ["lch <mode> <channel?>"],
  run: async (client, message, args) => {
    connect(client.getConfig.mongo + "Levels").catch((res) => { return })

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
        const newSchema = await LevelModel.findOne({
          Guild: message.guild.id,
          LevelChannel: channel.id
        })
        if(!channel.manageable) return message.lineReply(
          `${client.Emojis.no_check} No puedo ver o administrar ese canal.`
        );
        if(channel.isText() === false) return message.lineReply(
          `${client.Emojis.no_check} No puedo ver o administrar ese canal.`
        );
        if (newSchema) {
          newSchema.LevelChannel = channel.id
          newSchema.ImageURL = '#FFFFFF'
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
          new LevelModel({
            Guild: message.guild.id,
            LevelChannel: channel.id,
            ImageURL: '#FFFFFF'
          }).save().then(() => {
            message.lineReply(`${client.Emojis.check} Se establecio el canal de niveles a **${channel.name}**`)
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
        const newSchema = await LevelModel.findOne({
          Guild: message.guild.id,
        })
        if (newSchema) {
          return message.lineReply(`${client.Emojis.check} El canal establecido de niveles es **${'<#' + newSchema.LevelChannel + '>'}**`)
        } else {
          return message.lineReply(`${client.Emojis.no_check} No se establecio ningun canal para los niveles.`)
        }
      }; break;
      case 'delete': {
        LevelModel.findOneAndDelete({
          Guild: message.guild.id,
        }).then((res) => {
          return message.lineReply(`${client.Emojis.check} Se elimino de la base de datos el canal a donde llegaran las personas que suban de nivel.`)
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