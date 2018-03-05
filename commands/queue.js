module.exports = {
	name: 'queue',
	catagory: 'Music',
	description: 'Show queue',
	usage: 'queue',
	
	run : async (Subaru, client, args, message) => {
		try {
			if(!message.guild.voiceConnection) {Subaru.respond(message, 'There is no queue'); return;}
			if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'There is no queue'); return;}
			if (!Subaru.voice[message.guild.name].queue[0]) {Subaru.respond(message, 'There is no queue'); return;}
			
			let msg = '**Queue:**\n';
			for (i = 0; i < Subaru.voice[message.guild.name].queue.length; i++) 
			msg += ` \`${i + 1}\` ${Subaru.voice[message.guild.name].queue[i].title}\n`;
			Subaru.respond(message, msg);

		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

