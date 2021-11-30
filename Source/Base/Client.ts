import { Client, Collection } from "discord.js";
import path from "path";
import { Command } from "./Command";
import { Event } from "./Event";
import { Economy } from "economy-mongoose"
import { Config } from "./Config";
import { Configuration } from "./Configuration.json";
import { readdirSync } from "fs";
import { yellow, green } from "chalk";
import { connect } from "mongoose";
class Bot extends Client {
  public Emojis = {
    check: "<:yes:865027700329676830>",
    no_check: "<:no:865027700384071680>",
    info: "<:info:865027701002076170>",
  };
  public permisos = {
    bot: {
      ban: this.Emojis.no_check + " Necesito permisos para banear miembros.",
      kick: this.Emojis.no_check + " Necesito permisos para expulsar miembros.",
      embed: this.Emojis.no_check + " Necesito permisos para enviar embeds.",
    },
    miembro: {
      manage_g:
        this.Emojis.no_check +
        " Necesitas permisos de gestionar el servidor para usar este comando.",
      ban: this.Emojis.no_check + " Necesitas permisos para banear miembros.",
    },
  };
  public getCommand: Collection<string, Command> = new Collection();
  public getEvent: Collection<string, Event> = new Collection();
  public getConfig: Config = Configuration;
  public getAlias: Collection<string, Command> = new Collection();
  public async start(debug?: boolean) {
    let debugBoolean: boolean;
    if (!debug) debugBoolean = false;
    else if (debug === true) debugBoolean = true;
    else if (debug === false) debugBoolean = false;
    if (!this.getConfig.mongoP.includes("#")) {
      connect(this.getConfig.mongo, {useNewUrlParser:true}).then(() => {
        if (debugBoolean === true)
          return console.debug(green("Mongoose connected successfully."));
      })
        .catch(() => {
          if (debugBoolean === true)
            return console.debug(yellow("Error Mongoose."));
        });
      Economy.connect(this.getConfig.mongoP)
        .then(() => {
          if (debugBoolean === true)
            return console.debug(green("Mongoose connected successfully."));
        })
        .catch(() => {
          if (debugBoolean === true)
            return console.debug(yellow("Error Mongoose."));
        });
    }
    const CommandPath = path.join(__dirname, "..", "Commands");
    readdirSync(CommandPath).forEach((dir) => {
      const commands = readdirSync(`${CommandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );

      for (const file of commands) {
        const { command } = require(`${CommandPath}/${dir}/${file}`);
        this.getCommand.set(command.name, command);
        if (command?.aliases.lenght !== 0) {
          command.aliases.forEach((alias) => {
            this.getAlias.set(alias, command);
          });
        }
        if (debugBoolean === true) {
          console.debug(green(`Command loaded: ${command.name}`));
        }
      }
    });
    const EventPath = path.join(__dirname, "..", "Events");
    readdirSync(EventPath).forEach(async (file) => {
      const { event } = await import(`${EventPath}/${file}`);
      this.getEvent.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
      if (debugBoolean === true) {
        console.debug(green(`Event loaded: ${event.name}`));
      }
    });
    this.login(this.getConfig.token).then(() => {
      if (debugBoolean === true) {
        console.debug(
          green(
            "The bot was successfully logged in, if there are connection problems remove the intents."
          )
        );
      }
    });
  }
}

export default Bot;
