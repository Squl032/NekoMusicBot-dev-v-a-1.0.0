const Command = require("../Structures/Command");
const Discord = require("discord.js");
// const { permission } = require("./ban");
// const ms = require('ms');

module.exports = new Command({
    name: "unmute",
    description: "Unmute cmd for staff",
    permission: "MUTE_MEMBERS",
    async run(message, args, client) {
        const member = message.mentions.users.first();

        // const memberTarget = message.guild.members.cache.get(member.id);

        const muteRole = message.guild.roles.cache.find(role => role.name == 'Muted');
        // if (!muteRole) return message.guild.roles.create({ name: "Muted", color: "DARKER_GREY" });

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given.";

        if (!member) return message.reply("Please mention a member.");


        const msgembed = new Discord.MessageEmbed();
        const muteembed = new Discord.MessageEmbed();

        muteembed
            .setTitle(`You were unmuted from **${message.guild.name}**`)
            .setDescription(`Reason: ${reason}`)
            // .addField(`Your mute will expire in ${ms(ms(args[1]))}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            ;

        msgembed
            .setTitle("Unmuted Members")
            .setDescription("With reason: " + reason)
            .setColor("AQUA")
            .addFields({
                name: "Username",
                value: member.tag,
                inline: true
            }, {
                name: "ID Number",
                value: member.id,
                inline: true
            })
            .setFooter("By: " + message.author.username + " (" + message.author.id + ")"
            )
            ;



        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);


            message.channel.send({ embeds: [msgembed] });

            if (memberTarget.send({ embeds: [muteembed] })) {

                await memberTarget.roles.remove(muteRole)
            } else {

                await memberTarget.roles.remove(muteRole)
            }

        } else {
            message.channel.send("Can't find that member.")
        }

    }
});