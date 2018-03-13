module.exports = {
	name: 'move',
	catagory: 'Music',
	description: 'Make the bot join/move voive channels',
	usage: 'move',
	require: ["youtubeSearchApi"],	

	run : async (Subaru, client, args, message) => {
		try {
			if (!message.member.voiceChannel) {Subaru.respond(message, 'You are not in a voice channel.'); return;}
			message.member.voiceChannel.join();
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

