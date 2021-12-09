//@ts-nocheck
import { Command } from "../../Base/Command";
import { connect } from "mongoose";
import LevelModel from "../../Models/LevelModel";
import { extname } from "path";

export const command: Command = {
  name: "level-color",
  aliases: ['lclr'],
  description: "Con este comando podras administrar la imagen de fondo de la tarjeta de niveles.",
  example: ["lclr bluevio"],
  category: "Niveles",
  enable: true,
  onlyOwner: false,
  use: ["lclr <option>"],
  run: async (client, message, args) => {
    connect(client.getConfig.mongo + "Levels").catch((res) => { return })
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
      );
    const schema = await LevelModel.findOne({
      Guild: message.guild.id,
    })
    if (!schema) return message.lineReply(`${client.Emojis.no_check} Primero debes de establecer un canal de niveles usando **.lch set <canal>**.`)
    if (!schema.ImageURL) schema.ImageURL = '#FFFFFF'
    switch (args[0]) {
      default: message.lineReply(`${client.Emojis.no_check} Debes de elegir algunos de estos colores: **rojo, bluevio, azul, marron, rosa, violeta, negro, blanco, gris, bluevio2**.`)
      case 'bluevio2': schema.ImageURL = '#1D237B'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'bluevio': schema.ImageURL = '#6666cc'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'rojo': schema.ImageURL = '#FF0000'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'rosa': schema.ImageURL = '#ff0080'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'marron': schema.ImageURL = '#804000'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'violeta': schema.ImageURL = '#4c2882'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'negro': schema.ImageURL = '#000'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'blanco': schema.ImageURL = '#FFFFFF'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
      case 'gris': schema.ImageURL = '#2F3136'; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el color.`); break;
    }
  }
}