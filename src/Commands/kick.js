const Command = require("../Structures/Command");
const Discord = require("discord.js");

module.exports = new Command({
    name: "kick",
    description: "Kick cmd for staff members who has permission",
    permission: "KICK_MEMBERS",
    async run(message, args, client) {
        const member = message.mentions.users.first();

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given.";

        if (!member) return message.reply("Please mention a member.");

        const msgembed = new Discord.MessageEmbed();
        const kickembed = new Discord.MessageEmbed();

        kickembed
            .setTitle(`You were kicked from **${message.guild.name}**`)
            .setDescription(`Reason: ${reason}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
        ;

        msgembed
            .setTitle("Kicked Members")
            .setDescription("With reason: " + reason)
            .setColor("RED")
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
        );
        

        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);

            
            message.channel.send({ embeds: [msgembed] });

            if (memberTarget.send({ embeds: [kickembed] })) {
                const memberTarget = message.guild.members.cache.get(member.id);

                // memberTarget.send({ embeds: [banembed] });
                await memberTarget.kick({
                    reason: reason
                });

                return;
                // message.channel.send({ embeds: [msgembed] });

            } else {
                const memberTarget = message.guild.members.cache.get(member.id);

                // memberTarget.send({ embeds: [banembed] });
                await memberTarget.kick({
                    reason: reason
                });

                return;
                // message.channel.send({ embeds: [msgembed] });
            }
        }
    }
});