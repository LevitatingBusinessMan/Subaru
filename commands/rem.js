module.exports = {
	name: 'rem',
	catagory: 'Image',
	description: 'Image of rem',
	usage: 'rem',
	
	//Default function for use of "this"
	run : async function(Subaru, client, args, message) {
		try {
			//Only 2 things to change for different image commands
			let color = 0xff66ff;
			let verb = false;
			
			const request = require("axios");
			let result = await request.get('https://rra.ram.moe/i/r?type=' + this.name);		
			if (result.status != 200) return Subaru.respond(message, "Something went wrong retrieving your image :v");
			let image = 'https://cdn.ram.moe' + result.data.path.substr(2);
			
			let embed = {
				image: {url: image},
				color
			}
			
			if (args[0] && verb) {
				let receiver = Subaru.getUser(args[0], message.guild.members);
				if (!receiver) return Subaru.respond(message, 'User not found :v');
				let user =  message.guild.members.get(message.author.id);
				
				embed.description = `**${user.displayName}** ${verb} **${receiver.displayName}**!`;
			}
			
			Subaru.respond(message, {embed});
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}
