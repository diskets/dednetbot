const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let reason = "";
  reason = args.join(" ").slice(22);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";
  let warnchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  let sicon = message.guild.iconURL;

  const embed = new Discord.RichEmbed()
  .setTitle(":star: Отчет о варне (подслушка с Бибо) :star:")
  .setColor("#fc6400")
  .addField("Нарушитель", `<@${wUser.id}>`, true)
  .addField("Предупреждение выдано в", message.channel, true)
  .addField("Предупреждение выдал", message.member, true)
  .addField("Причина", reason, true);

  if(warnchannel){
    warnchannel.send({embed});
  } else {
    console.log("No warnchannel defined");
  }
}

module.exports.help = {
  name: "warn2"
}