module.exports = {
	name: 'join',
	catagory: 'Music',
	description: 'Join voice channel',
	usage: 'join',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!message.member.voiceChannel) {Subaru.respond(message, 'You are not in a voice channel.'); return;}
			message.member.voiceChannel.join( conn => console.log(typeof conn));
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

