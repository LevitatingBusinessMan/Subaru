module.exports = {
	name: 'pause',
	catagory: 'Music',
	description: 'Pause music',
	usage: 'pause',
	
	run : async (Subaru, client, args, message) => {
		try {
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name].np) {Subaru.respond(message, 'No song playing'); return;}
		
		Subaru.voice[message.guild.name].np.paused = false;
		Subaru.voice[message.guild.name].dispatcher.resume();
		Subaru.respond(message, ':arrow_forward:');
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

