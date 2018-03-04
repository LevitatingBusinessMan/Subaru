module.exports = {
	name: 'leave',
	catagory: 'Music',
	description: 'Make the bot leave VC',
	usage: 'leave',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (message.guild.voiceConnection) {
				message.guild.voiceConnection.channel.leave();
				delete Subaru.voice[message.guild.name];
				Subaru.respond(message, 'Left voice channel');
			} else Subaru.respond(message, 'I am not in a voice channel');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

