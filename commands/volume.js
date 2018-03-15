module.exports = {
	name: 'volume',
	catagory: 'Music',
	description: 'Set/Show volume',
	usage: 'volume',
	
	run : async (Subaru, client, args, message) => {
		try {
			if(!message.guild.voiceConnection) {Subaru.respond(message, 'No song playing'); return;}
			if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'No song playing'); return;}
			if (!Subaru.voice[message.guild.name].np) {Subaru.respond(message, 'No song playing'); return;}
			
			if (!args[0] || isNaN(args[0])) Subaru.respond(message, `Current volume: \`${Subaru.voice[message.guild.name].dispatcher.volume * 100}\`%`);
			else if (args[0]) {
				if (args[0] > 200) Subaru.voice[message.guild.name].dispatcher.setVolume(2); //max
				else if (args[0] < 10) Subaru.voice[message.guild.name].dispatcher.setVolume(0.1); //min
				else Subaru.voice[message.guild.name].dispatcher.setVolume(Math.floor(args[0])/100);
				Subaru.respond(message, `Volume: \`${Math.floor(Subaru.voice[message.guild.name].dispatcher.volume * 100)}\`%`)
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

