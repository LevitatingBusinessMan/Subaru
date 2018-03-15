/**
 * Play a song to at a guild
 * @param {Object} Subaru - The Subaru Object
 * @param {Object} guild - guild to play at
 * @param {Object} queueElement - Object from Subaru.voice[guild.name].queue
 */

const yt = require('ytdl-core');
module.exports = (Subaru, guild, queueElement) => {
	try {
		if(!guild.voiceConnection) Subaru.log('err', `Can't play song in ${messge.guild.name}, no voiceConnection`);
		else if (!Subaru || !guild || !queueElement) Subaru.log('err', `Not enough args to play song`);
		else {
			//First close the dispatcher if still open, can happen with a force play
			if (Subaru.voice[guild.name].dispatcher) {
				if (!Subaru.voice[guild.name].dispatcher.destroyed) Subaru.voice[guild.name].dispatcher.end('stop');
				Subaru.sleep(50);
			}
			
			if (Subaru.voice[guild.name].np) var volume = Subaru.voice[guild.name].dispatcher.volume;
			else var volume = Subaru.config.default_volume;
			
			Subaru.voice[guild.name].dispatcher = guild.voiceConnection.playStream(yt(queueElement.url, { audioonly: true }), {
				volume: volume,
				passes: Subaru.config.voice_passes
			});
			
			//Send message
			yt.getInfo(queueElement.url, (err, info) => {
				let author = guild.members.get(queueElement.author);
				let embed = {
					author: {
						name: info.author.name,
						url: info.author.channel_url,
						icon_url: info.author.avatar
					},
					color: 0xff0000,
					title: info.title,
					url: info.video_url,
					image: {url: info.player_response.videoDetails.thumbnail.thumbnails.last().url + '&width=100&height=200'},
					timestamp: new Date(queueElement.time),
					footer: {
						icon_url: author.user.avatarURL,
						text: author.user.username
				}};
				
				let channel = guild.channels.get(Subaru.GUILDS.get(guild.id).musicChannel);
				if (channel) channel.send('Now playing:', {embed});
				else guild.channels.get(queueElement.channel).send('Now playing:', {embed});
				Subaru.voice[guild.name].np = new Object();
				Subaru.voice[guild.name].np.DiscordEmbed = embed;
				Subaru.voice[guild.name].np.length = info.length_seconds;
				
				Subaru.voice[guild.name].dispatcher.on('end', reason => {
					//kill: killed by leaving
					//stop: pause
					
					if(reason == 'stop') return;
					
					if (reason != 'kill' && Subaru.voice[guild.name].queue[0]) {
						//Repeat off
						if (!Subaru.voice[guild.name].loop) Subaru.playSong(Subaru, guild, Subaru.voice[guild.name].queue.shift());
						//Repeat on
						else {
							Subaru.voice[guild.name].queue.push(queueElement); //Put this shit back in queue
							Subaru.playSong(Subaru, guild, Subaru.voice[guild.name].queue.shift());
						}
					}
					
					//Repeat on, no queue
					else if (reason != 'kill' && Subaru.voice[guild.name].loop) Subaru.playSong(Subaru, guild, queueElement);
					//Repeat off, no queue
					else {delete Subaru.voice[guild.name]; guild.voiceConnection.channel.leave();}//kill
				});
				Subaru.voice[guild.name].dispatcher.on('error', err => {
					Subaru.error('err', err);
				});
			});
		}
	} catch (err){
		Subaru.log('err', err);
	}
}