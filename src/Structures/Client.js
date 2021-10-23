const Discord = require("discord.js");

const music = require('@koenie06/discord.js-music');

// const { REST } = require('@discordjs/rest');

const { Routes } = require('discord-api-types/v9');

const fs = require("fs");

const Event = require("./Event.js");

const { Permissions } = require('discord.js');

const intents = new Discord.Intents(32767);

const config = require("../Data/config.json")

const Command = require("./Command.js")


class Client extends Discord.Client {

    constructor() {
        super({ intents, allowedMentions: { repliedUser: true} });

        /**
         * @type {Discord.Collection<string, Command}
         */
        this.commands = new Discord.Collection();

        this.prefix = config.prefix;
    }

    start(token) {

        fs.readdirSync("./src/Commands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {

            /**
             * @type {Command}
             */
            const command = require(`../Commands/${file}`);
            console.log(`Command ${command.name} loaded.`);
            this.commands.set(command.name, command);

        });
    
        fs.readdirSync("./src/Events")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                /**
                 * @type {Event}
                 */
                const event = require(`../Events/${file}`);
                console.log(`Event ${event.event} loaded.`);
                this.on(event.event, event.run.bind(null, this));


            });

        this.login(token);
    }

}

module.exports = Client;
