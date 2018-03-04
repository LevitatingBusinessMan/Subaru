const yt = require('ytdl-core');

module.exports = {
	name: 'play',
	catagory: 'Music',
	description: 'Play a song or add to queue. Use `-f` to bypass queue',
	usage: 'play https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) {Subaru.respond(message, 'You didn\'t specify a link!'); return;}
			if (!message.member.voiceChannel) {Subaru.respond(message, 'You are not in a voice channel.'); return;}
			if (!message.guild.voiceConnection) message.member.voiceChannel.join();
			
			yt.getInfo(args[0], (err, info) => {
				if(err) {Subaru.respond(message, 'That\'s not a valid youtube link'); return;}
				else var song_title = info.title;
			
				if (message.content.includes('-f') || !Subaru.voice[message.guild.name]) {
					if (!Subaru.voice[message.guild.name]) {
						Subaru.voice[message.guild.name] = new Object();
						Subaru.voice[message.guild.name].id = message.guild.id;
						Subaru.voice[message.guild.name].queue = [];
						Subaru.voice[message.guild.name].np = new Object();
					}
					//Play now
					Subaru.playSong(Subaru, message.guild, {
						title: song_title,
						url: args[0],
						author: message.author.id,
						channel: message.channel.id,
						time: message.createdTimestamp
					});
				} else {
					if (Subaru.voice[message.guild.name].queue.filter(x => x.url == args[0])[0]) {
						Subaru.respond(message, 'That song is already in the queue!'); return;
					}					
					//Push to queue
					Subaru.voice[message.guild.name].queue.push({
						title: song_title,
						url: args[0],
						author: message.author.id,
						channel: message.channel.id,
						time: message.createdTimestamp
					});
					Subaru.respond(message, `Added \`${song_title}\` to queue`);
				}
			
			});
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

