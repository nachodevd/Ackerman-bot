//@ts-nocheck
import { Command } from "../../Base/Command";
import { MessageEmbed, TextChannel } from "discord.js";
import { Discord } from "../../Util/Colors.json";
import { utils } from 'udirp'
export const command: Command = {
    category: "Utilidades",
    name: "morse",
    aliases: [],
    description:
        "Con este comando se podras pasar un texto a codigo morse.",
    enable: true,
    onlyOwner: false,
    example: ['morse hola => .... --- .-.. .-'],
    use: ["morse <texto>"],
    run: async (client, message, args) => {
        if (!args.join(" "))
            return message.lineReply(
                `${client.Emojis.no_check} No se ingreso ningun argumento.`
            );
        let i;
        const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
            morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");
        let text = args.slice(0).join(" ").toUpperCase();
        while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
            text = text.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
        }
        if (text.startsWith(".") || text.startsWith("-")) {
            text = text.split(" ");
            const length = text.length;
            for (i = 0; i < length; i++) text[i] = alpha[morse.indexOf(text[i])];
            text = text.join("");
        } else {
            text = text.split("");
            const length = text.length;
            for (i = 0; i < length; i++) text[i] = morse[alpha.indexOf(text[i])];
            text = text.join(" ");
        }
        message.lineReply("```" + text + "```").catch(error => {
            client.channels.fetch('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                Error con el comando: \`${command.name}\`,
                Error: \`\`\`${error}\`\`\`
                `);
            })
        })
    }
}