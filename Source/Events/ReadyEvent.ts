import { Event } from "../Base/Event";
import { green } from "chalk";
import { TextChannel } from "discord.js";
import { computer } from 'udirp'
export const event: Event = {
  name: "ready",
  run: async (client) => {
    console.log(green("The bot is online."));
    var today = new Date();
    (await client.channels.cache.get('911476630071934976') as TextChannel).send(`
    :white_check_mark: Me prendi correctamente.
    
\`\`\`yaml
IP : ${(await computer.getAllInfo()).ip}
Plataforma : ${(await computer.getAllInfo()).platform}
Sistema : ${(await computer.getAllInfo()).system_info}
Desde : ${__filename}
Fecha : ${today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()}
Hora : ${today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}
\`\`\`
    `)
  },
};
