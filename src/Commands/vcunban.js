const Command = require("../Structures/Command");
const Discord = require("discord.js");

// const { Permissions } = require('discord.js');
// const { permission } = require("./ban");
// const ms = require('ms');


module.exports = new Command({
    name: "vcunban",
    description: "Unban a user from VC",
    permission: "MOVE_MEMBERS",
    async run(message, args, client) {
        const member = message.mentions.users.first();

        // const memberTarget = message.guild.members.cache.get(member.id);

        const vcbanRole = message.guild.roles.cache.find(role => role.name == 'VC Banned');
        // if (!muteRole) return message.guild.roles.create({ name: "Muted", color: "DARKER_GREY" });

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given.";

        if (!member) return message.reply("Please mention a member.");

        // if (member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return message.reply(`You can not VC Unban that member!`);


        const msgembed = new Discord.MessageEmbed();
        const vcunbanembed = new Discord.MessageEmbed();

        vcunbanembed
            .setTitle(`You are VC unbanned from **${message.guild.name}**`)
            .setDescription(`Reason: ${reason}`)
            // .addField(`Your mute will expire in ${ms(ms(args[1]))}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            ;

        msgembed
            .setTitle("VC Unbanned Members")
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

            if (memberTarget.send({ embeds: [vcunbanembed] })) {

                await memberTarget.roles.remove(vcbanRole)
            } else {

                await memberTarget.roles.remove(vcbanRole)
            }

        } else {
            message.channel.send("Can't find that member.")
        }

    }
});