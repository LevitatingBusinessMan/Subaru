module.exports = {
	name: 'skip',
	catagory: 'Music',
	description: 'Skip a song',
	usage: 'skip',
	
	run : async (Subaru, client, args, message) => {
		try {
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'No song playing'); return;}
		
		Subaru.voice[message.guild.name].dispatcher.end();
		Subaru.respond(message, ':fast_forward:');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

