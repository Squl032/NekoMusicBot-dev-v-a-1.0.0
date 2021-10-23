const Command = require("../Structures/Command.js");


module.exports = new Command({
    name: "ping",
    permission: "SEND_MESSAGES",
    description: "Show the ping of the bot.",

    async run(message, args, client) {
        
        const msg = await message.reply(`Pong: \`${client.ws.ping} ms\`.`);

        msg.edit(`Pong: \`${client.ws.ping} ms\`.\nMessage Ping: \`‫ ms.\``)

        msg.edit(`Pong: \`${client.ws.ping} ms\`.\nMessage Ping: \`${msg.createdTimestamp - message.createdTimestamp} ms.\``)
    }
});