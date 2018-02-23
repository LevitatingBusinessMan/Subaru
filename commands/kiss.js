module.exports = {
	name: 'kiss',
	catagory: 'Image',
	description: 'Kiss someone! Share the love UwU',
	usage: 'kiss Emilia',
	
	run : async (Subaru, client, args, message) => {
		try {
			const request = require("axios");
			let result = await request.get('https://nekos.life/api/v2/img/kiss');
			if (!result.data) {Subaru.log('warn', 'Trying to load image command');Subaru.respond(message, 'Error trying to get image'); return;}
			let embed = {
				title: 'Kiss',
				image: result.data,
				color: 0xff66ff,
				footer:{
					text: 'powered by https://nekos.life'
			}
			}
			if (!args[0] == false) {
				let receiver = Subaru.getUser(args[0], message.guild.members);
				if (!receiver) {Subaru.respond(message, 'User not found :v'); return;}
				let user =  message.guild.members.get(message.author.id);
				if (!user) {Subaru.respond(message, 'Something went wrong  :v'); return;}
				
				embed.description = `**${user.displayName}** kissed **${receiver.displayName}**!`;
			}
			Subaru.respond(message, {embed});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}
