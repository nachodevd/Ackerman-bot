import { Event } from "../Base/Event";
import WelcomeModel from "../Models/WelcomeModel";
import { crearDB } from "megadb";
import { CanvasSenpai } from 'canvas-senpai'
const canva = new CanvasSenpai();
import { GuildMember, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
const GoalDB = new crearDB({ carpeta: "Database", nombre: "GoalDrive" }),
  DebugDB = new crearDB({ carpeta: "Database", nombre: "DebugChannelDrive" }),
  WelcomeDB = new crearDB({ carpeta: "Database", nombre: "WelcomeRolesDrive" });
export const event: Event = {
  name: "guildMemberAdd",
  run: async (client, member: GuildMember) => {
    var schema = await WelcomeModel.findOne({
      Guild: member.guild.id,
    })
    if (!schema) { } else {
      //const rank = new Rank().setBackground('COLOR', schema.ImageURL).setDiscriminator(message.member.user.discriminator).setUsername(message.member.user.username).setAvatar(message.member.user.displayAvatarURL({ format: 'png' })).setCurrentXP(xp).setRequiredXP((5 * (schema.Level ** 2) + 50 * schema.Level + 100)).setLevel(nivel).setStatus(message.member.user.presence.status, true)
      canva.welcome(member, { link: schema.ImageURL, block: false, blur: false }).then(buffer => {
        const img = new MessageAttachment(buffer, 'img.png')
        return client.channels.fetch(schema.WelcomeChannel).then((res) => {
          try {
            (res as TextChannel).send(img)
          } catch (error) {
            return
          }
        })
      })
    }
    let debug_channel;
    if (DebugDB.tiene(member.guild.id))
      debug_channel = await DebugDB.get(member.guild.id);
    if (GoalDB.tiene(member.guild.id)) {
      const canal = await GoalDB.get(`${member.guild.id}.canal`);
      const meta = await GoalDB.get(`${member.guild.id}.meta`);
      const miembros = member.guild.memberCount;
      try {
        client.channels.fetch(canal).then((e) => {
          (e as TextChannel).edit({ name: `Meta: ${miembros}/${meta}` });
        });
      } catch (error) {
        let embed = new MessageEmbed()
          .setDescription(
            `
            Nuevo error! \`Goal\`.
            No se pudo actualizar/editar la goal.
            Error:\`\`\`\n${error}\n\`\`\`
            `
          )
          .setColor("RED");
        try {
          client.channels.fetch(debug_channel).then((e) => {
            (e as TextChannel).send(embed);
            client.channels.fetch('911464193981554718').then((e) => {
              (e as TextChannel).send(embed);
            })
          });
        } catch (error) {
          return;
        }
      }
    }
    if (WelcomeDB.tiene(member.guild.id)) {
      let rol = await WelcomeDB.get(member.guild.id);
      try {
        member.roles.add(rol).catch((e) => {
          let embed = new MessageEmbed()
            .setDescription(
              `
            Nuevo error! \`Join Role\`.
            No se pudo dar el rol de bievenida.
            Error:\`\`\`\n${e}\n\`\`\`
            `
            )
            .setColor("RED");
          try {
            client.channels.fetch(debug_channel).then((e) => {
              (e as TextChannel).send(embed);
              client.channels.fetch('911464193981554718').then((e) => {
                (e as TextChannel).send(embed);
              })
            });
          } catch (error) {
            return;
          }
        });
      } catch (error) {
        let embed = new MessageEmbed()
          .setDescription(
            `
            Nuevo error! \`Join Role\`.
            No se pudo dar el rol de bievenida.
            Error:\`\`\`\n${error}\n\`\`\`
            `
          )
          .setColor("RED");
        try {
          client.channels.fetch(debug_channel).then((e) => {
            (e as TextChannel).send(embed);
            client.channels.fetch('911464193981554718').then((e) => {
              (e as TextChannel).send(embed);
            })
          });
        } catch (error) {
          return;
        }
      }
    } else {
      return;
    }
  },
};
