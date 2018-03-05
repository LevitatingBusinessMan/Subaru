module.exports = {
	name: 'leave',
	catagory: 'Music',
	description: 'Make the bot leave VC',
	usage: 'leave',
	require: ["youtubeSearchApi"],
	
	run : async (Subaru, client, args, message) => {
		try {
			if (message.guild.voiceConnection) {
				if (Subaru.voice[message.guild.name].dispatcher) Subaru.voice[message.guild.name].dispatcher.end('kill');
				Subaru.respond(message, 'Left voice channel');
			} else Subaru.respond(message, 'I am not in a voice channel');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

