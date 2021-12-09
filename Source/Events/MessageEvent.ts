//@ts-nocheck
import { Event } from "../Base/Event";
import { agregarCooldown, removerCooldown, resetCooldown } from '../Util/cooldown';
import { Economy } from 'economy-mongoose'
import { Discord } from "../Util/Colors.json";
import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../Base/Command";
import LevelModel from '../Models/LevelModel'
import { Rank } from 'canvacord'
export const event: Event = {
  name: "message",
  run: async (client, message: Message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !message.guild.available
    ) return
    var schema = await LevelModel.findOne({
      Guild: message.guild.id,
    })
    if (!schema) { }
    else {
      if (!schema.XP) schema.XP = 0
      if (!schema.Level) schema.Level = 1
        var nivel = schema.Level,
          xp = schema.XP,
          xpRandom = Math.floor(Math.random() * 25) + 1
      schema.XP = + xpRandom + schema.XP

      schema.save().then(() => {
        if (schema.XP > (5 * (schema.Level ** 2) + 50 * schema.Level + 100)) {
          schema.Level = schema.Level + 1
          schema.save().then(() => {
            const rank = new Rank().setBackground('COLOR', schema.ImageURL).setDiscriminator(message.member.user.discriminator).setUsername(message.member.user.username).setAvatar(message.member.user.displayAvatarURL({ format: 'png' })).setCurrentXP(xp).setRequiredXP((5 * (schema.Level ** 2) + 50 * schema.Level + 100)).setLevel(nivel).setStatus(message.member.user.presence.status, true)
            rank.build()
              .then(buffer => {
                const img = new MessageAttachment(buffer, 'img.png')
                return client.channels.fetch(schema.LevelChannel).then((res) => {
                  try {
                    (res as TextChannel).send(img)
                  } catch (error) {
                    return
                  }
                })
              })
          })
        } else return
      })
    }
    if (!message.guild.me.hasPermission("SEND_MESSAGES") ||
      !message.content.startsWith(client.getConfig.prefix))
      return;
    const args = message.content
      .slice(client.getConfig.prefix.length)
      .trim()
      .split(/ +/g),
      cmd = args.shift();
    if (!cmd) return;
    let command = client.getCommand.get(cmd) || client.getAlias.get(cmd);
    if (command) {
      if (command.enable === true) {
        if (command.onlyOwner === true) {
          if (message.author.id !== client.getConfig.ownerID) return message.lineReply(`${new MessageEmbed().setColor(Discord).setDescription(`
          ${client.Emojis.no_check} El comando solicitado solamente lo pueden usar los creadores del bot.`)}`)
          //  Dentro de command.enable y command.onlyOwner (truex2)
          agregarCooldown(command.name, message.author.id, { segundos: 3 }, (resp, tiempo) => {
            if (resp) {
              if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.lineReply(`${client.Emojis.no_check} Necesito permisos para enviar embeds.`)
              Economy.createUser(message.member.id, message.guild.id) && (command as Command).run(client, message, args);
            } else return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
            ${client.Emojis.no_check} Debes esperar **${tiempo.segundos}** segundos para volver a usar **${command.name}**.`))
          })
        } else {
          agregarCooldown(command.name, message.author.id, { segundos: 3 }, (resp, tiempo) => {
            if (resp) {
              if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.lineReply(`${client.Emojis.no_check} Necesito permisos para enviar embeds.`)
              Economy.createUser(message.member.id, message.guild.id) && (command as Command).run(client, message, args);
            } else return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
            ${client.Emojis.no_check} Debes esperar **${tiempo.segundos}** segundos para volver a usar **${command.name}**.`))
          })
        }
      } /** Si el comando esta deshabilitado =>*/ else return message.lineReply(`${new MessageEmbed().setColor(Discord).setDescription(`
        ${client.Emojis.no_check} El comando solicitado no esta disponible actualmente.`)}`)
    }
  },
};