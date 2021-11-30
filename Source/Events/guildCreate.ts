import { Event } from "../Base/Event";
import { Guild, MessageEmbed, TextChannel, User } from "discord.js";
export const event: Event = {
    name: "guildCreate",
    run: async (client, guild: Guild) => {
        const logs = (await guild.fetchAuditLogs({ type: 'BOT_ADD' })).entries.filter(l => (l.target as User).id == client.user.id).last();
        const embed = new MessageEmbed()
            .setAuthor(logs.executor.tag, logs.executor.displayAvatarURL({ dynamic: true }))
            .addField(`Nombre del servidor:`, guild.name)
            .addField(`ID del servidor:`, guild.id)
            .addField(`Tag del usuario:`, logs.executor.tag)
            .addField(`ID del usuario:`, logs.executor.id)
            .addField('Owner del servidor', guild.owner.user.tag)
            .setColor("#6666cc")
            .setTimestamp();
        (await client.users.fetch('624320717571227658')).send(embed);
        (client.channels.cache.get('911464193981554718') as TextChannel).send(embed)
    },
};
