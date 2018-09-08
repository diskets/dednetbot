const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
	if(!message.member.hasPermission("MANAGE_MESSAGES"))
		return;

	message.delete().catch(O_o=>{});

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

module.exports.help = {
	name: "serverinfo"
}
