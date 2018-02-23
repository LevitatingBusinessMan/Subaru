module.exports = {
	name: 'emojis',
	catagory: 'General',
	description:'Displays all custom emoji\'s',
	usage:'emojis',
	
	run : async (Subaru, client, args, message) => {
		try {
			let emojis = message.guild.emojis.array().filter((v) => {return v.animated != true});
			let animated = message.guild.emojis.array().filter((v) => {return v.animated == true});
			let embed = {
				title: "Emoji\'s in " + message.guild.name,
				description : `Emoji\'s left: ${50 - emojis.length} \nAnimated: ${animated.length} (not shown)` ,
				fields: []
			};
			if (emojis.length > 24) var embed2 = {fields: []};
			let i = 0;
			await emojis.forEach(emoji => {
				let emojiField = {name: emoji.name, value: '<:' + emoji.name + ':' + emoji.id + '>'	, inline: true}
				if (i < 25) embed.fields.push(emojiField); else embed2.fields.push(emojiField);
				i++;
			});
			Subaru.respond(message, {embed}).then(x => x.addDestructor(message.author.id));
			if (embed2) Subaru.respond(message, {embed: embed2}).then(x => x.addDestructor(message.author.id));
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}