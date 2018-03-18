module.exports = {
	name: 'nsfw',
	catagory: 'Image',
	description: 'Get a nsfw image',
	usage: 'nsfw',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (message.channel.nsfw){
				const request = require("axios");
				let result = await request.get('https://rra.ram.moe/i/r?type=nsfw-gtn&nsfw=true');		
				if (result.status != 200) return Subaru.respond(message, "Something went wrong retrieving your image :v");
				let image = 'https://cdn.ram.moe' + result.data.path.substr(2);
				
				let embed = {
					image: {url: image},
					color: 0x6600cc
				}
				
				Subaru.respond(message, {embed});
			} else return Subaru.respond(message, 'This channel is not nsfw!')
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

