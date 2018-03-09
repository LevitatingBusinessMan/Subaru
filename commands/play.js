const yt = require('ytdl-core');
const request = require('axios');

module.exports = {
	name: 'play',
	catagory: 'Music',
	description: 'Play a song or add to queue with a link or query. Use `-f` to bypass queue',
	usage: 'play rick ashley never gonna hit those notes',
	require: ["youtubeSearchApi"],
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) {Subaru.respond(message, 'You didn\'t specify a song!'); return;}
			if (!message.member.voiceChannel) {Subaru.respond(message, 'You are not in a voice channel.'); return;}
			
			//Create GuildVoice
			if (!Subaru.voice[message.guild.name]) {
				let GuildVoice = new Object();
				GuildVoice.queue = [];
				GuildVoice.np = false;
				
				Subaru.voice[message.guild.name] = GuildVoice;
			}
			
			//Video url
			if (args[0].startsWith('https://www.youtube.com/watch?v=') || args[0].startsWith('https://youtu.be/')){
				if (args[0].startsWith('https://www.youtube.com/watch?v=')) var id = args[0].split('=')[1];
				if (args[0].startsWith('https://youtu.be/')) var id = args[0].split('/').trim()[2];
				if (!id) {Subaru.repond(message, 'Invalid video url'); return;}
				let results = await request.get(`https://www.googleapis.com/youtube/v3/videos?key=${Subaru.config.youtubeSearchApi}&id=${id}&part=snippet`)
				if (results.status != '200'||results.data.error) {
					Subaru.log('warn', `Trigger: ${message.content}\n Status code: ${results.status}, `);
					Subaru.respond(message,'An error occured :v')
				} else {if (results.data.items[0]) Play(results.data.items[0]); else Subaru.respond(message, 'Invalid video url');}
			} else 
			//Playlist	
			if (args[0].startsWith('https://www.youtube.com/playlist?list=')) {
				let id = args[0].split('=')[1];
				if (!id) {Subaru.repond(message, 'Invalid playlist url'); return;}
				let results = await request.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=${Subaru.config.youtubeSearchApi}&playlistId=${id}&maxResults=50&part=snippet`)
				if (results.status != '200'||results.data.error) {
					Subaru.log('warn', `Trigger: ${message.content}\n Status code: ${results.status}`);
					Subaru.respond(message,'An error occured :v')
				}
				if (!results.data.items[0]) Subaru.respond(message, 'Invalid or empty playlist');
				
				else {
					if (!message.guild.voiceConnection) message.member.voiceChannel.join()
						.catch(err => {Subaru.log('err',`trigger: ${message.content}\n ${err}`); Subaru.respond(message, 'An error occured :v')});
					
					for (i =0, count = 0; results.data.items.length > i; i++, count++) {
						let info = results.data.items[i];
						//Check if song is already in queue
						if (!Subaru.voice[message.guild.name].queue.filter(x => x.url == 'https://www.youtube.com/watch?v=' + info.snippet.resourceId.videoId)[0]) 
							Subaru.voice[message.guild.name].queue.push({
								title: info.snippet.title,
								url: 'https://www.youtube.com/watch?v=' + info.snippet.resourceId.videoId,
								author: message.author.id,
								channel: message.channel.id,
								time: message.createdTimestamp
							});
						else count--;
					}
					Subaru.respond(message, `Added \`${count}\` songs to queue`);
					if (!Subaru.voice[message.guild.name].np) Subaru.playSong(Subaru, message.guild, Subaru.voice[message.guild.name].queue.shift());
				}
			}
			//Query
			else searchSong(args.filter(x => x != '-f').join(' ')).then(info => Play(info)).catch(msg => msg.edit('Ended song selection'));
			function Play(info) {
				if (!message.guild.voiceConnection) message.member.voiceChannel.join()
				.catch(err => {Subaru.log('err',`trigger: ${message.content}\n ${err}`); Subaru.respond(message, 'An error occured :v')});
				
				if (message.content.includes('-f') || !Subaru.voice[message.guild.name].np){
					
					Subaru.playSong(Subaru, message.guild, {
						title: info.snippet.title,
						url: 'https://www.youtube.com/watch?v=' + (typeof info.id == 'object'?info.id.videoId:info.id),
						author: message.author.id,
						channel: message.channel.id,
						time: message.createdTimestamp
					});
					
				} else {
					if (Subaru.voice[message.guild.name].queue.filter(x => x.url == info.video_url)[0]) {
						Subaru.respond(message, 'That song is already in the queue!'); return;
					}
					
					Subaru.voice[message.guild.name].queue.push({
						title: info.snippet.title,
						url: 'https://www.youtube.com/watch?v=' + (typeof info.id == 'object'?info.id.videoId:info.id),
						author: message.author.id,
						channel: message.channel.id,
						time: message.createdTimestamp
					});
					Subaru.respond(message, `Added \`${info.snippet.title}\` to queue`);
				}
					
			}
			
			function searchSong(query){
				return new Promise(async(resolve, reject) => {
					let results = await request.get(`https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&type=video&maxResults=10&key=${Subaru.config.youtubeSearchApi}&relevanceLanguage=en`);

					if (results.status != '200'||results.data.error) {
						Subaru.log('warn', `Trigger: ${message.content}\n Status code: ${results.status}, `);
						Subaru.respond(message,'An error occured :v')}
					else {
						let items = results.data.items;
						if (!items[0]) {Subaru.respond(message, 'No results :v');}
						let result_msg = 'Choose:\n';
						let i = 1;
						items.forEach(x => {result_msg += `\`${i}\` ` + x.snippet.title + '\n'; i++});
						result_msg += '**Cancel with `c`**';
						
						//Selector
						Subaru.respond(message, result_msg).then(list_msg => {
							var collector = 
								list_msg.channel.createMessageCollector(msg => msg.author == message.author, {time: 15	 * 1000});
							collector.on('collect', collected_msg => {
								if (collected_msg.content == 'c') collector.stop();
								let index = parseInt(collected_msg.content) - 1;
								if(items[index]){
									list_msg.edit(`Selected song: \`${items[index].snippet.title}\``);
									collected_msg.delete();
									resolve(items[index]);
								} else collector.stop();
							});
							collector.on('end', () => reject(list_msg));
						});
					}
				});
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

