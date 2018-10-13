const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function send_money(payed, toPay, message, bot){

	var retricIcon = bot.emojis.find("name", "retric");

	var user_obj = User.findOne({
		userID: payed.id
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {
				let newCash = foundObj.retrocoinCash + toPay;
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.reply(`вы перевели ${numberWithCommas(payed)} ${toPay}${retricIcon}!`);
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	var payed = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!payed)
		return message.reply("пользователь не найден / не указан!");

	if (payed.bot)
		return message.reply("боту твои деньги не нужны, он и так мажор")

	if (isNumeric(args[1]) && !args[2] && Number(args[1]) >= 1) {

		var user_obj = User.findOne({
			userID: message.member.id
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj){
					console.log("User not found in database");
					return;
				}
				else {
					var actCash = foundObj.retrocoinCash;
					var toPay = Number(args[1]);
					var newCash = actCash - toPay;
					if (newCash < 0)
						return message.reply("у тебя нехватка нала для такой операции!");

					send_money(payed, toPay, message, bot);

					foundObj.retrocoinCash = newCash;
					foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;

					foundObj.save(function(err, updatedObj){
					if(err)
						console.log(err);
					})
				}
			}
		});
	}
	else
		return message.reply("чеееее :thinking:");
}

module.exports.help = {
	name: "pay"
}
