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
		
		Subaru.voice[message.guild.name].np.paused = true;
		Subaru.voice[message.guild.name].dispatcher.pause();
		Subaru.respond(message, ':pause_button:');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

