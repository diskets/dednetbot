const Discord = require("discord.js");
const fs = require("fs");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var Item = require('./../schemas/shop_model.js');

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;
  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    return;
  if(!args)
    return message.reply(`"название" цена испозуемое(+/-) продаваемое(+/-) удаляемое(+/-)`);
  var itm = "";
  var prc = 0;
  var ifU = "-";
  var ifS = "-";
  var ifD = "-";
  if(message.cleanContent.indexOf('"') > -1){
    itm = message.cleanContent.split('"', 2).pop();
    var newStr = message.cleanContent.split('"').pop();
    console.log("New Str: " + newStr);
    prc = newStr.split(" ", 2).pop();
    console.log("Price: " + prc);
    ifU = (newStr.split(" ", 3).pop() == "+") ? true : false;
    ifS = (newStr.split(" ", 4).pop() == "+") ? true : false;
    ifD = (newStr.split(" ", 5).pop() == "+") ? true : false;
  }
  else {
    prc = Number(argc[1]);
    itm = args[0];
    ifU = (args[2] == '+') ? true : false;
    ifS = (args[3] == '+') ? true : false;
    ifD = (args[4] == '+') ? true : false;
  }
  if(!args[4])
    return message.reply(`"название" цена испозуемое(+/-) продаваемое(+/-) удаляемое(+/-)`);
  var newItem = new Item({
    itemName: itm,
    itemPrice: prc,
    usable: ifU,
    sellable: ifS,
    deletable: ifD,
    created: Date.now()
  });
  newItem.save()
  .then(item => {
    console.log('New item "'+itm+'" added to database');
  })
  .catch(err => {
    console.log("Error on database save: " + err);
  });
  return message.reply(`"${itm}" добавлено в магазин`);
}

module.exports.help = {
  name: "additem"
}
