//@ts-nocheck
import { Command } from "../../Base/Command";
import { Economy } from "economy-mongoose"
import { MessageEmbed } from 'discord.js'
import { agregarCooldown, removerCooldown, resetCooldown } from '../../Util/cooldown';
import { Discord } from "../../Util/Colors.json";
export const command: Command = {
    name: "work",
    aliases: ['trabajar'],
    description:
        "Con este comando podras ganar dinero trabajando.",
    example: [],
    category: "Economia",
    enable: true,
    onlyOwner: false,
    use: [],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.lineReply(client.permisos.bot.embed);
        agregarCooldown('work', `${message.author.id +'g='+ message.guild.id}`, { horas: 12 }, (res, tiempo) => {
            if (res) {
                let money = Math.floor(Math.random() * 1200/*Minimo*/)
                var conv = (bank) => String(bank).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let rta = [`Trabajaste todo el dia construyendo edificios y el tacaño de tu jefe te pago **${conv(money)}usd.**`, `Has trabajado muy bien y has ganado **${conv(money)}usd.**`, `Trabajaste todo el dia y no te ha pagado tu jefe, pero para tu suerte vino un señor y te ha regalado **${conv(money)}usd**.`]
                var aleatorio = rta[Math.floor(Math.random() * (rta.length))];
                Economy.addWallet(message.author.id, message.guild.id, money)
                return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(client.Emojis.check + ' ' + aleatorio))
            } else {
                return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
                ${client.Emojis.no_check} Debes esperar **${tiempo.horas + ' horas, ' + tiempo.minutos + ' minutos y ' + tiempo.segundos + ' segundos.'}** para poder volver a trabajar.`))
            }
        })
    }
}