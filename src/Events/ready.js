/** @format */

const Event = require("../Structures/Event.js");

module.exports = new Event("ready", (client) => {

    console.log(`${client.user.tag}: I'm ready!`);  
    // client.user.setPresence({
    //     status: "dnd",
    //     activities: {
    //         name: "Rushia Ch. 潤羽るしあ",
    //     }
    // });
    // client.user.setActivity("Rushia Ch. 潤羽るしあ", { type: "WATCHING" });
    
    client.user.setPresence({ 
        activities: [{ 
            name: "Visual Studio Code", 
            type: "PLAYING" 
        }], 
        status: "dnd" 
    });
});

