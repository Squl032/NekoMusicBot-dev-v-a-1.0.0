/** @format */

const Event = require("../Structures/Event.js");
const Discord = require("discord.js")

module.exports = new Event("messageCreate", async (client, message) => {

    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!args[0]) return;

    if (!command) {

        const msg = await message.reply(`**${args[0]}** is not a valid command.`);
        setTimeout(() => msg.delete(), 5000);

        return;
    }

    const permission = message.member.permissions.has(command.permission, true);

    const embed = new Discord.MessageEmbed();

    embed
        .setDescription(`You do not have the permission **\`${command.permission}\`** to run this command!`)
        .setColor("RED")
        ;

    if (!permission) {
        message.reply({ embeds: [embed] });
        return;
    }

    command.run(message, args, client);

});
