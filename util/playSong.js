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
			Subaru.voice[guild.name].dispatcher = guild.voiceConnection.playStream(yt(queueElement.url, { audioonly: true }), {volume: 0.1});
			
			//Send message
			yt.getInfo(queueElement.url, (err, info) => {
				let author = guild.members.get(queueElement.author);
				let embed = {
					color: 0xff0000,
					title: info.title,
					url: info.video_url,
					description: info.description.substr(1, 300) + (info.description.length > 500 ? '...' : ''),
					image: {url: info.thumbnail_url},
					timestamp: new Date(queueElement.time),
					footer: {
						icon_url: author.user.avatarURL,
						text: author.user.username
				}};
				
				guild.channels.get(queueElement.channel).send('Now playing:', {embed});
				Subaru.voice[guild.name].np = new Object();
				Subaru.voice[guild.name].np.DiscordEmbed = embed;
				Subaru.voice[guild.name].np.length = info.length_seconds;
				
				Subaru.voice[guild.name].dispatcher.on('end', reason => {
					if(reason == 'stop') return;
					if (!(reason == 'kill') && Subaru.voice[guild.name].queue[0]) Subaru.playSong(Subaru, guild, Subaru.voice[guild.name].queue.shift());
					else {Subaru.voice[guild.name].np = false; guild.voiceConnection.channel.leave();}
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