module.exports = {
	name: 'shuffle',
	catagory: 'Music',
	description: 'Shuffle queue',
	usage: 'shuffle',
	
	run : async (Subaru, client, args, message) => {
		try {
			if(!message.guild.voiceConnection) {Subaru.respond(message, 'There is no queue'); return;}
			if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'There is no queue'); return;}
			if (!Subaru.voice[message.guild.name].queue[0]) {Subaru.respond(message, 'There is no queue'); return;}
			
			Subaru.voice[message.guild.name].queue = Subaru.voice[message.guild.name].queue.shuffle()
			Subaru.respond(message, ':twisted_rightwards_arrows: Shuffled the queue!');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

