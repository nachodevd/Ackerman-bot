import { Event } from "../Base/Event";
import { TextChannel } from "discord.js";
export const event: Event = {
    name: "error",
    run: async (error) => {
        (error.channels.cache.get('911624838320361522') as TextChannel).send(`${error}`).catch(() => { return })
    }
}