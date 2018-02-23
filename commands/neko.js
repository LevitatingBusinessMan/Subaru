module.exports = {
	name: 'neko',
	catagory: 'Image',
	description: 'Get a neko',
	usage: 'neko',
	detailedDescription: 'If you are in a nsfw channel, \`prefix.neko lewd\` away! :wink:',
	
	run : async (Subaru, client, args, message) => {
		try {
			const request = require("axios");
			if (!args[0]) request.get('https://nekos.life/api/v2/img/neko').then(x => Subaru.respond(message, {embed:{
				title: 'Neko',
				image: x.data,
				color: 0x6600cc,
				footer:{
						text: 'powered by https://nekos.life'
					}
			}}));
			else if (args[0] == 'lewd') {
				if (message.channel.nsfw) request.get('https://nekos.life/api/v2/img/lewd').then(x => Subaru.respond(message, {embed:{
				title: 'Lewd neko',
				image: x.data,
				color: 0x6600cc,
				footer:{
						text: 'powered by https://nekos.life'
					}
				}}));
				else Subaru.respond(message, 'This channel isn\'t NSFW!');
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

