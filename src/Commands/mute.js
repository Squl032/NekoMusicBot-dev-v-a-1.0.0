const Command = require("../Structures/Command");
const Discord = require("discord.js");
// const { permission } = require("./ban");
// const ms = require('ms');

module.exports = new Command({
    name: "mute",
    description: "Mute cmd for staff",
    permission: "MUTE_MEMBERS",
    async run(message, args, client) {
        const member = message.mentions.users.first();

        // const memberTarget = message.guild.members.cache.get(member.id);

        const muteRole = message.guild.roles.cache.find(role => role.name == 'Muted');
        if (!muteRole) return message.guild.roles.create({ name: "Muted", color: "#818386" });

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given.";

        if (!member) return message.reply("Please mention a member.");

        const msgembed = new Discord.MessageEmbed();
        const muteembed = new Discord.MessageEmbed();

        muteembed
            .setTitle(`You were muted from **${message.guild.name}**`)
            .setDescription(`Reason: ${reason}`)
            // .addField(`Your mute will expire in ${ms(ms(args[1]))}`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            ;

        msgembed
            .setTitle("Muted Members")
            .setDescription("<:MUTE:894935920715903059>\nWith reason: " + reason)
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
            const memberTarget = message.guild.members.cache.get(member.id)
            

            message.channel.send({ embeds: [msgembed] });

            if (memberTarget.send({ embeds: [muteembed] })) {

                await memberTarget.roles.add(muteRole)
            }

        } else {
            message.channel.send("Can't find that member.")
        }

    }
});