const Command = require("../Structures/Command");
const Discord = require("discord.js");
// const { permission } = require("./ban");
// const ms = require('ms');

module.exports = new Command({
    name: "vcban",
    description: "Ban a user from VC",
    permission: "MOVE_MEMBERS",
    async run(message, args, client) {
        const member = message.mentions.users.first();

        // const memberTarget = message.guild.members.cache.get(member.id);

        const vcbanRole = message.guild.roles.cache.find(role => role.name == 'VC Banned');
        if (!vcbanRole) return message.guild.roles.create({ name: "VC Banned", color: "#818386" });

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given.";

        if (!member) return message.reply("Please mention a member.");

        const msgembed = new Discord.MessageEmbed();
        const vcbanembed = new Discord.MessageEmbed();

        vcbanembed
            .setTitle(`You are VC banned from **${message.guild.name}**`)
            .setDescription(`Reason: ${reason}`)
            // .addField(`Your mute will expire in ${ms(ms(args[1]))}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            ;

        msgembed
            .setTitle("VC Banned Members")
            .setDescription("With reason: " + reason)
            .setColor("DARK_AQUA")
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


            await message.channel.send({ embeds: [msgembed] });

            if (memberTarget.send({ embeds: [vcbanembed] })) {

                await memberTarget.roles.add(vcbanRole)
            }

        } else {
            message.channel.send("Can't find that member.")
        }

    }
});