//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed, TextChannel } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { utils } from 'udirp'
export const command: Command = {
    category: "Utilidades",
    name: "inviteinfo",
    aliases: ["info-invite", 'infoinv'],
    description:
        "Con este comando se podras ver informacion sobre un codigo de invitacion.",
    enable: true,
    onlyOwner: false,
    example: ['infoinv 7dE3S3Va'],
    use: ["infoinv <...code>"],
    run: async (client, message, args) => {
        const inv = args[0]
        if (!inv) return message.lineReply(
            new MessageEmbed().setColor(Discord).setDescription(`
            ${client.Emojis.no_check} No se ingreso ningun argumento.
            `)
        );
        client.fetchInvite(`discord.gg/${inv}`).then(async (res) => {
            message.lineReply(new MessageEmbed().setDescription(`
Servidor:
\`\`\`yaml
Creado : ${(await (await utils.getTime(res.guild.createdTimestamp)).date)}
ID : ${res.guild.id}
Miembros : ${res.guild.memberCount}
Nombre : ${res.guild.name}
Verificacion : ${res.guild.verificationLevel}
OwnerID : ${res.guild.ownerID}
Region : ${res.guild.region}\`\`\`\
Canal: 
\`\`\`yaml
Creado : ${(await (await utils.getTime(res.channel.createdTimestamp)).date)}
ID : ${res.channel.id}
Nombre : ${res.channel.name}\`\`\`
            `).setColor(Discord).setAuthor(res.guild.name, res.guild.iconURL({ dynamic: true })))
        }).catch((error) => {
            message.lineReply(`${client.Emojis.no_check} No se encontro la invitacion.`)
            client.channels.fetch('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                Error con el comando: \`${command.name}\`,
                Error: \`\`\`${error}\`\`\`
                `);
            });
            return
        })
    }
}