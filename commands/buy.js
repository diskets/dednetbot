const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Item = require('./../schemas/shop_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function buyitem(user, item, message, bot){

  var kaef = bot.emojis.find("name", "fallout_kaef");
	var newCash = user.retrocoinCash - item.itemPrice;
	var user_obj = User.findOne({userID: message.member.id}, function(err, found_user){
		if (err)
			console.log("WTF there is an error: " + err);
		else {
			if (!user_obj)
				console.log("User not found");
			else {
				//если у юзера инвентарь старого типа - делаю резет
				if (typeof found_user.inv[0] === 'object')
					var newinv = [];
				else
					var newinv = found_user.inv;
				newinv.push(item.itemName);
				found_user.retrocoinCash = newCash;
				found_user.inv = newinv;
				found_user.save(function(err, updatedObj){
				if (err)
					console.log(err);
				});
			}
		}
	});
	return message.reply("держи, вот тебе " + item.itemName);
}

module.exports.run = async (bot, message, args) => {

	var kaef = bot.emojis.find("name", "fallout_kaef");

	//message.delete().catch(O_o=>{});

	//ищем есть ли человек, который пытается что либо купить, у нас в базе
	var user_obj = await User.findOne({userID: message.member.id}, function(err, found_user){});

	if (typeof user_obj === 'undefined' || user_obj === null)
		return message.reply("пользователь не найден в базе");

	//парсим что человек пытается купить
	var item = message.content.split(" ").toString();
	var to_cut = item.indexOf(",");
	item = item.slice(to_cut + 1);
	item = item.replace(/,/g, " ");
	item = item.replace(/\s\s+/g, ' ');

	//ищем этот итем у нас в базе, узнаем цену
	var item_obj = await Item.findOne({itemName: item}, function(err, found_item){});

	if (typeof item_obj === 'undefined' || item_obj === null)
		return message.reply("укажите точное название из магазина");

  //чекаем есть ли у человека в инветаре этот предмет или есть ли эта роль
	if (item_obj.itemName == "Покупка роли: Азартный игрок 🎲"){
	 if (user_obj.inv.includes(item_obj.itemName) == true)
		return message.reply(`у тебя уже есть ${item_obj.itemName}`);
	 if(message.member.roles.some(r=>["Азартный игрок 🎲"].includes(r.name)))
     return message.reply(`ты уже Азартный игрок!`);
	};
	if (item_obj.itemName == "Покупка роли: Шулер 🎱"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Шулер 🎱"].includes(r.name)))
		 return message.reply(`ты уже Шулер!`);
	};
  if (item_obj.itemName == "Boost Pack +5% 💰"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Boost Pack +5% 💰"].includes(r.name)))
 		 return message.reply(`у тебя уже есть этот Boost Pack!`);
	};
	if (item_obj.itemName == "Ключ от номера 🔑"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Ключ от 1-го номера"].includes(r.name)))
  		 return message.reply(`у тебя уже есть этот ключ!`);
	};
	if (item_obj.itemName == "Пропуск в Убежище 111 💣"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>['Житель убежища "111"'].includes(r.name)))
   		 return message.reply(`ты уже являешься Жителем убежища "111"!`);
	};
	if (item_obj.itemName == "Покупка роли: **Активист** 🔋"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Активист 🔋"].includes(r.name)))
    		 return message.reply(`ты уже **Активист**!`);
	};
	if (item_obj.itemName == "Ключ к Клубничному чату 🍓"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["🍓Клубничный клуб🍓"].includes(r.name)))
     return message.reply(`у тебя уже есть доступ к Клубничному клубу! ${kaef}`);
	};
	if (item_obj.itemName == "Покупка роли: **Коренной житель (lv.35)**"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Коренной житель (lv.35)"].includes(r.name)))
     return message.reply(`ты уже стал Коренным жителем!`);
	};
	if (item_obj.itemName == "Boost Pack +25% 💰"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Boost Pack +25% 💰"].includes(r.name)))
			return message.reply(`у тебя уже есть этот Boost Pack!`);
	};
	if (item_obj.itemName == "Покупка роли: **Легенда (lv.50)**"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Легенда [lv.50]"].includes(r.name)))
		 return message.reply(`ты уже стал Легендой!`);
	};
	if (item_obj.itemName == "Boost Pack +50% 💰"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Boost Pack +50% 💰"].includes(r.name)))
 		 return message.reply(`у тебя уже есть этот Boost Pack!`);
	};
	if (item_obj.itemName == "Boost Pack +75% 💰"){
		if (user_obj.inv.includes(item_obj.itemName) == true)
		 return message.reply(`у тебя уже есть ${item_obj.itemName}`);
		if(message.member.roles.some(r=>["Boost Pack +75% 💰"].includes(r.name)))
  	 return message.reply(`у тебя уже есть этот Boost Pack!`);
  };
	//проверяем может ли юзер купить то, что задумал
	if (user_obj.retrocoinCash - item_obj.itemPrice >= 0)
		buyitem(user_obj, item_obj, message, bot);
	else
		return message.reply("у тебя не хватает на " + item_obj.itemName);
}

module.exports.help = {
	name: "buy"
}
