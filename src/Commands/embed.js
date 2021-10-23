const Command = require("../Structures/Command.js");

const Discord = require("discord.js");


module.exports = new Command({
    name: "embed",
    description: "Show an embed",
    permission: "EMBED_LINKS",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed
            .setTitle("Do not click this")
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true }),
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )
            .setDescription("secret.uwu [click here to download](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setTimestamp(/*message.createdTimestamp*/)
            // .setImage("https://cdn.discordapp.com/attachments/733499877912346737/893729235116634112/unknown.png")
            // .addField("Bot version: ", "1.0.0", true)
            .addFields({
                name: "Bot Version",
                value: "1.0.0",
                inline: true
            }, {
                name: "Bot Name",
                value: client.user.username,
                inline: true
            })

        message.reply({ embeds: [embed] });

    }
});