module.exports = {
	name: 'np',
	catagory: 'Music',
	description: 'Skip a song',
	usage: 'np',
	
	run : async (Subaru, client, args, message) => {
		try {
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name].np) {Subaru.respond(message, 'No song playing'); return;}
		
		let playedMinutes = Subaru.voice[message.guild.name].dispatcher.time / 60000;
		let lengthMinutes = Subaru.voice[message.guild.name].np.length / 60;
		let playedTimeStamp = Math.floor(playedMinutes)+':'+Math.floor(playedMinutes * 60 - Math.floor(playedMinutes) * 60);
		let lengthTimeStamp = Math.floor(lengthMinutes)+':'+(lengthMinutes * 60 - Math.floor(lengthMinutes) * 60);

		let embed = Subaru.voice[message.guild.name].np.DiscordEmbed;
		embed.fields = [];
		embed.fields.push({name: 'Progress:', value: `\`${playedTimeStamp}/${lengthTimeStamp}\``});
		Subaru.respond(message, (Subaru.voice[message.guild.name].np.paused ? ':pause_button: paused:' : 'Now playing:'), {embed});
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

