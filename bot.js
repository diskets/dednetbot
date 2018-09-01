const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

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


//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
  //tempmute @member Time

  if(cmd === `${prefix}tempmute`){

      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("Пользователь не существует!");
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Этот пользователь не может быть замучен!");
      let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");

      if(!muterole) return errorschannel.send("Роль мута не найдена!");

      let mutetime = args[1];
      if(!mutetime) return message.reply("Вы не указали время мута!");

      let repchannel = message.guild.channels.find(`name`, "reports");
      let errorschannel = message.guild.channels.find(`name`, "errors");
      if(!repchannel) return errorschannel.send("Канал отчетов не существует!");

      await(tomute.addRole(muterole.id));
      message.channel.send(`<@${tomute.id}> был замучен  на ${ms(ms(mutetime))}`);

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        repchannel.send(`<@${tomute.id}> был размучен!`);
      }, ms(mutetime));

      return;

}

  //-----------------------------------------------------------------------------
    //ban @member reason

    if(cmd === `${prefix}ban`){


         const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
         if(!bUser) return message.channel.send("Пользователь не существует!");
         let bReason = args.join(" ").slice(22);

         if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
         if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Этот пользователь не может быть забанен!");


         let embed = new Discord.RichEmbed()
           .setTitle("ОТЧЕТ О БАНЕ")
           .setColor("#DD5044")
           .addField("Забаненный пользователь:", `${bUser}`, true)
           .addField("Пользователя забанил:", `<@${message.author.id}>`, true)
           .addField("Забанен в канале:", message.channel, true)
           .addField("Время бана:", message.createdAt, true)
           .addField("Был забанен за:", bReason, true)

           let repchannel = message.guild.channels.find(`name`, "reports");
           let errorschannel = message.guild.channels.find(`name`, "errors");
           if(!repchannel) return errorschannel.send("Канал отчетов не существует!");

           message.guild.member(bUser).ban(bReason);

           message.channel.send(bUser+" был забанен за "+ bReason);
           repchannel.send({embed});

       return;
     }



  //-----------------------------------------------------------------------------
    //kick @member reason

    if(cmd === `${prefix}kick`){


         const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
         if(!kUser) return message.channel.send("Пользователь не существует!");
         let kReason = args.join(" ").slice(22);

         if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
         if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Этот пользователь не может быть кикнут!");


         let embed = new Discord.RichEmbed()
           .setTitle("ОТЧЕТ О КИКЕ")
           .setColor("#DD5044")
           .addField("Кикнутый пользователь:", `${kUser}`, true)
           .addField("Пользователя кикнул:", `<@${message.author.id}>`, true)
           .addField("Кикнут в канале:", message.channel, true)
           .addField("Время кика:", message.createdAt, true)
           .addField("Был кикнут за:", kReason, true)

           let repchannel = message.guild.channels.find(`name`, "reports");
           let errorschannel = message.guild.channels.find(`name`, "errors");
           if(!repchannel) return errorschannel.send("Канал отчетов не существует!");

           message.guild.member(kUser).kick(kReason);

           message.channel.send(kUser+" был кикнут за "+ kReason);
           repchannel.send({embed});

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

    let repchannel = message.guild.channels.find(`name`, "reports");
    let errorschannel = message.guild.channels.find(`name`, "errors");
    if(!repchannel) return errorschannel.send("Канал жалоб не существует!");

    message.channel.send(`${message.author}`+" жалоба отправлена!");

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
      let bicon = bot.user.avatarURL;
      const embed = new Discord.RichEmbed()
        .setTitle("ИНФОРМАЦИЯ О БОТЕ")
        .setColor("#4C8BF5")
        .setThumbnail(bicon)
        .addField("Ник бота:", bot.user.username, true)
        .addField("Версия бота:", "1.0.0", true)
        .addField("Бот создан:", bot.user.createdAt, true)

    message.channel.send({embed});
   }

//-----------------------------------------------------------------------------
  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Bot is online");
  }

//-----------------------------------------------------------------------------

});

bot.login(process.env.BOT_TOKEN);
