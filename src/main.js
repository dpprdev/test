"use strict";

const Discord = require("discord.js");
const moment = require("moment");

/**
 * @param {string} token 
 */

class bot {
    constructor(token, options = {}) {
        this.token = token;
        this.options = options;
        /**
         * @param {string} total
         * @param {string} users
         * @param {string} bots 
         */

        if (!this.options.total) {
            this.options.total = null;
            throw new Error("Please specify \"Total Members\" channel ID");
        }
        if (!this.options.users) {
            this.options.users = null;
            throw new Error("Please specify \"Member Count\" channel ID");
        }
        if (!this.options.bots) {
            this.options.bots = null;
            throw new Error("Please specify \"Bot Count\" channel ID");
        }

        const client = new Discord.Client({fetchAllMembers: true});

        const Console = console;
        client.on("ready", () => {

            if (client.guilds.size < 1) {
                throw new Error("The bot is not in any guild.");
            } //Shutdowns, if bot is not in any guild
            if (client.guilds.size > 1) {
                throw new RangeError("The bot is in more than 1 guild.");
            } //Shutdowns, if bot is in more than 1  guild
            const text = `
______________________________
Ready since: ${moment(Date.now()).format("dddd, MMMM Do YYYY, HH:mm:ss")}
Server: ${client.guilds.first().name}
Total server members: ${client.guilds.first().memberCount}
Working On: https://github.com/dpprdev/npm-statsbot/
______________________________
`; //The text that displays to console, when client is ready.
            Console.log(text);
        });

        client.on("guildMemberAdd", (member) => {
            //All choices are optional here. Bot wont work if the channel ID's are wrong. How to properly get ID's read in README.md 
            try {
                member.guild.channels.get(this.options.total).setName(`Total Members: ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
                member.guild.channels.get(this.options.users).setName(`User Count: ${member.guild.members.filter((m) => !m.user.bot).size}`); // This text is also changeable, still keep the code in ${}
                member.guild.channels.get(this.options.bots).setName(`Bot Count: ${member.guild.members.filter((m) => m.user.bot).size}`); // This text is also changeable, still keep the code in ${}

            } catch (e) {
                if (!client.channels.get(this.options.total) || isNaN(this.options.total)) {
                    throw new Error("Please specify a valid \"Total Members\" channel id.");
                }
                if (!client.channels.get(this.options.users) || isNaN(this.options.users)) {
                    throw new Error("Please specify a valid \"Member Count\" channel id.");
                }
                if (!client.channels.get(this.options.bots) || isNaN(this.options.bots)) {
                    throw new Error("Please specify a valid \"Bot Count\" channel id.");
                }

            }
        });
        client.on("guildMemberRemove", (member) => {
            //All choices are optional here. Bot wont work if the channel ID's are wrong. How to properly get ID's read in README.md 
            try {
                member.guild.channels.get(this.options.total).setName(`Total Members: ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
                member.guild.channels.get(this.options.users).setName(`User Count: ${member.guild.members.filter((m) => !m.user.bot).size}`); // This text is also changeable, still keep the code in ${}'s
                member.guild.channels.get(this.options.bots).setName(`Bot Count: ${member.guild.members.filter((m) => m.user.bot).size}`); // This text is also changeable, still keep the code in ${}'s

            } catch (e) {
                if (!client.channels.get(this.options.total) || isNaN(this.options.total)) {
                    throw new Error("Please specify a valid \"Total Members\" channel id.");
                }
                if (!client.channels.get(this.options.users) || isNaN(this.options.users)) {
                    throw new Error("Please specify a valid \"Member Count\" channel id.");
                }
                if (!client.channels.get(this.options.bots) || isNaN(this.options.bots)) {
                    throw new Error("Please specify a valid \"Bot Count\" channel id.");
                }

            }
        });
        try {
            client.login(this.token);
        } catch (e) {
            if (e) {
                throw new Error("Please insert a valid token!");
            }
        }
    }
}

module.exports = bot;
