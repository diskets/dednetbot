const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} онлайн!`);

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);



//-----------------------------------------------------------------------------
  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Бот работает!");
  }

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
  //kick @member reason

  if(cmd === `${prefix}kick`){


       let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!kUser) return message.channel.send("Пользователь не существует!");
       let kReason = args.join(" ").slice(22);

       if(!message.member.roles.some(r=>["Спец.Агент ЦРУ", "Зам.Директора ЦРУ", "Директор ЦРУ"].includes(r.name))) return message.channel.send("Кикать пользователей может только ЦРУ!");
       if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Этот пользователь не может быть кикнут!");


       let kickEmbed = new Discord.RichEmbed()
         .setTitle("ОТЧЕТ О КИКЕ")
         .setColor("#DD5044")
         .addField("Кикнутый пользователь:", `${kUser}`, true)
         .addField("Пользователя кикнул:", `<@${message.author.id}>`, true)
         .addField("Кикнут в канале:", message.channel, true)
         .addField("Время кика:", message.createdAt, true)
         .addField("Был кикнут за:", kReason, true)

         const repchannel = message.guild.channels.find(`name`, "репорты");
         const errorschannel = message.guild.channels.find(`name`, "errors");
         if(!repchannel) return errorschannel.send("Канал отчетов не существует!");

         message.channel.send(kUser+" был кикнут за "+ kReason);
         repchannel.send({kickEmbed});

     return;
   }

//-----------------------------------------------------------------------------
  //!report @nick Жалоба

  if (cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Пользователь не существует!");
    let reason = args.join(" ").slice(22);

    let embed = new Discord.RichEmbed()
      .setTitle("ЖАЛОБА")
      .setColor("#F76806")
      .addField("Жалоба на:", `${rUser}`, true)
      .addField("Жалобу подал:", `${message.author}`, true)
      .addField("Канал:", message.channel, true)
      .addField("Время создания жалобы:", message.createdAt, true)
      .addField("Жалоба:", reason, true)

  const repchannel = message.guild.channels.find(`name`, "репорты");
  const errorschannel = message.guild.channels.find(`name`, "errors");
  const roleModers = message.guild.roles.find("name", "Сражи Порядка");
  if(!repchannel) return errorschannel.send("Канал жалоб не существует!");

  message.delete().catch(O_o=>{});
  repchannel.send({embed});

  return;
  }

//-----------------------------------------------------------------------------
  //!serverinfo

  if (cmd === `${prefix}serverinfo`) {
    let sicon = message.guild.iconURL;
    const embed = new Discord.RichEmbed()
      .setTitle("ИНФОРМАЦИЯ О СЕРВЕРЕ")
      .setColor("#4C8BF5")
      .setThumbnail(sicon)
      .addField("Имя сервера:", message.guild.name, true)
      .addField("Версия сервера:", "1.9", true)
      .addField("Сервер создан:", message.guild.createdAt, true)
      .addField("Вы присоединились:", message.member.joinedAt, true)
      .addField("Всего учасников:", message.guild.memberCount, true)

  message.channel.send({embed});
  }

//-----------------------------------------------------------------------------
  //!botinfo

  if(cmd === `${prefix}botinfo`){
    const embed = new Discord.RichEmbed()
      .setTitle("ИНФОРМАЦИЯ О БОТЕ")
      .setColor("#4C8BF5")
      .addField("Ник бота:", bot.user.username, true)
      .addField("Версия бота:", "1.0.0", true)
      .addField("Бот создан:", bot.user.createdAt, true)

  message.channel.send({embed});
 }
});


bot.login(process.env.BOT_TOKEN);
