const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} онлайн!`);
  bot.user.setGame("on Dalas!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //!info

  if(cmd === `${prefix}info`){

    const embed = new Discord.RichEmbed()

  .setTitle("Информация")
  .setColor("#4C8BF5")
  .setField("Версия бота: 1.0.0")

  message.channel.send({embed});

 }

  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Бот работает!");
  }

});

bot.login(process.env.BOT_TOKEN);
