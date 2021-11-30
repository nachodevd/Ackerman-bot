declare module "discord.js" {
    interface Message {
        lineReply: (s: string | MessageEmbed) => any
}
}