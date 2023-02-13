const Bot = require("./classes/bot.js");

const sessionPath = "./session-dir";

const bot = new Bot("BOT01", sessionPath);

bot.init();
bot.sendMsg();
bot.mentionAll();