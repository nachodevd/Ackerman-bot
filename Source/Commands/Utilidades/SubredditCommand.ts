//@ts-nocheck
import { MessageEmbed } from "discord.js";
import { Command } from "../../Base/Command";
import { Discord } from "../../Util/Colors.json";
import got from 'got'
export const command: Command = {
    name: "subreddit",
    aliases: ['subr'],
    category: "Utilidades",
    description:
        "Con este comando podras ver una imagen random de un subreddit.",
    example: ['subr memes'],
    use: ['subr <subreddit>'],
    enable: true,
    onlyOwner: false,
    run: async (client, message, args) => {
        if (!args[0]) return message.lineReply(new MessageEmbed().setColor(Discord).setDescription(`
		${client.Emojis.no_check} Debes de ingresar un subreddit, este no debe incluir r/.`))
        try {
            const lol = new MessageEmbed();

            got(`https://www.reddit.com/r/${args[0]}/random.json`)
                .then((response) => {
                    let content = JSON.parse(response.body);
                    let permalink = content[0].data.children[0].data.permalink;
                    let memeUrl = `https://reddit.com/${permalink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeDownvotes = content[0].data.children[0].data.downs;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
                    lol.setTitle(`${memeTitle}`);
                    lol.setURL(`${memeUrl}`);
                    lol.setColor(Discord);
                    lol.setImage(memeImage);
                    lol.setFooter(
                        `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
                    );
                    message.lineReply(lol).catch(() => {
                        return message.lineReply(`⚠️ Error desconocido.`)
                    });
                })
                .catch((error) => {
                    client.channels.fetch('911464171600769065').then((e) => {
                        (e as TextChannel).send(`
                        Error con el comando: \`${command.name}\`,
                        Error: \`\`\`${error}\`\`\`
                        `);
                    });
                    try {
                        message.delete()
                    } catch (error) {
                        return
                    }
                });
        } catch (error) {
            client.channels.fetch('911464171600769065').then((e) => {
                (e as TextChannel).send(`
                Error con el comando: \`${command.name}\`,
                Error: \`\`\`${error}\`\`\`
                `);
            });
            try {
                message.delete()
            } catch (error) {
                return
            }
        }
    }
}