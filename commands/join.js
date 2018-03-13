module.exports = {
	name: 'join',
	catagory: 'Music',
	description: 'Join voice channel',
	usage: 'join',
	require: ["youtubeSearchApi"],	

	run : async (Subaru, client, args, message) => {
		try {
			if (message.guild.voiceConnection) {Subaru.respond(message, 'I am already in a voice channel'); return;}
			if (!message.member.voiceChannel) {Subaru.respond(message, 'You are not in a voice channel.'); return;}
			message.member.voiceChannel.join();
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

