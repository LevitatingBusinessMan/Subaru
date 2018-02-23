module.exports = {
	name: 'pat',
	catagory: 'Image',
	description: 'Pat someone! Share the love UwU',
	usage: 'pat Puck',
	
	run : async (Subaru, client, args, message) => {
		try {
			const request = require("axios");
			let result = await request.get('https://nekos.life/api/v2/img/pat');
			if (!result.data) {Subaru.log('warn', 'Trying to load image command');Subaru.respond(message, 'Error trying to get image'); return;}
			let embed = {
				title: 'Pat',
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
				
				embed.description = `**${user.displayName}** patted **${receiver.displayName}**!`;
			}
			Subaru.respond(message, {embed});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}