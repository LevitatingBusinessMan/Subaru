module.exports = {
	name: 'neko_lewd',
	catagory: 'Image',
	description: 'Like the neko command, but lewd. Requires the channel to be NSFW',
	usage: 'neko_lewd',
	
	run : async (Subaru, client, args, message) => {
		try {
			
			const request = require("axios");
			if (message.channel.nsfw) request.get('https://nekos.life/api/v2/img/lewd').then(x => Subaru.respond(message, {embed:{
				image: x.data,
				color: 0x6600cc,
				footer:{
					text: 'powered by https://nekos.life'
				}
			}}));
			else Subaru.respond(message, 'This channel isn\'t NSFW!');
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

