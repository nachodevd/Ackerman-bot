//@ts-nocheck
import { Command } from "../../Base/Command";
import { connect } from "mongoose";
import WelcomeModel from "../../Models/WelcomeModel";
import { join } from "path";

export const command: Command = {
  name: "welcome-backgrond",
  aliases: ['wbg'],
  description: "Con este comando podras administrar el fondo de la tarjeta de bienvenida.",
  example: ['wbg rojo'],
  category: "Bienvenida",
  enable: true,
  onlyOwner: false,
  use: ["wbg <image:file>"],
  run: async (client, message, args) => {
    connect(client.getConfig.mongo + "Bienvenida").catch((res) => { return })
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.lineReply(
        `${client.Emojis.no_check} Necesitas permisos para gestionar el servidor.`
      );
    const schema = await WelcomeModel.findOne({
      Guild: message.guild.id,
    })
    if (!schema) return message.lineReply(`${client.Emojis.no_check} Primero debes de establecer un canal de bienvenida usando **.wch set <canal>**.`)
    if (!schema.ImageURL) schema.ImageURL = join(__dirname+'..', '..', '..', '/Util/Images/bgwel.png')
    switch (message.attachments.first()) {
      case message.attachments.first(): schema.ImageURL = message.attachments.first().url; schema.save() && message.lineReply(`${client.Emojis.check} Se actualizo el fondo (imagen).`); break;
      default: message.lineReply(`${client.Emojis.no_check} Debes de adjuntar una imagen.`)
    }
  }
}