//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed, SnowflakeUtil } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { utils } from 'udirp'
export const command: Command = {
    category: "Utilidades",
    name: "deconstruct",
    aliases: [],
    description:
        "Con este comando se podras desconstruir una ID.",
    enable: true,
    onlyOwner: false,
    example: [],
    use: ["deconstruct <ID>"],
    run: async (client, message, args) => {
        if (!args[0])
            return message.lineReply(
                `${client.Emojis.no_check} No se ingreso ningun argumento.`
            );
        if (args[0].length > 19) return message.lineReply(
            `${client.Emojis.no_check} Las ID de discord no superan los 19 caracteres.`
        );
        if (!Number(args[0])) return message.lineReply(
            `${client.Emojis.no_check} Ingresa una ID real.`
        );
        const data = SnowflakeUtil.deconstruct(args[0]),
            embed = new MessageEmbed()
                .setColor((await import('../../Util/Colors.json')).Discord)
                .setTimestamp(data.date)
                .addField("Worker ID", data.workerID === undefined ? 'No encontrado.' : data.workerID, true)
                .addField("Process ID", data.processID === undefined ? 'No encontrado.' : data.processID, true)
                .addField("Incrementacion", data.increment, true)
                .addField("Representacion binaria", data.binary);
        return message.lineReply(embed).catch(error =>{
            client.channels.fetch('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                Error con el comando: \`${command.name}\`,
                Error: \`\`\`${error}\`\`\`
                `);
            })
        })
    }
}