/** @format */

// console.clear();

const Client = require("./src/Structures/Client.js");

const config = require("./src/Data/config.json");

const client = new Client();

client.start(config.token);
