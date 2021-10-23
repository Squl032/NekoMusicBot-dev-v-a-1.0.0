const Command = require("../Structures/Command");

module.exports = new Command({
    name: "clear",
    description: "Clear an amount of messages.",
    permission: "MANAGE_MESSAGES",
    async run(message, args, client) {

        const amount = args[1];

        if (!amount || isNaN(amount))
            return message.reply(
                `**${
                    amount == undefined ? "Nothing" : amount
                }** is not a valid number!`)
        ;
                

        const amountParsed = parseInt(amount);

        if (amountParsed > 100) return message.reply("You cannot clear more than **100** messages!");

        if (amountParsed < 1) return message.reply("You cannot clear less than **1** messages!");

        

        message.channel.bulkDelete(amountParsed + 1);

        const msg = await message.channel.send(`\`\`\`nim\nCleared ${amountParsed} messages.\`\`\``);


        setTimeout(() => msg.delete(), 5000);

    }
});