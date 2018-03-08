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
			
			yt.getInfo(args[0], async (err, info) => {				
				if(err) {
					//arg was not a url but a query
					if(!err.message.startsWith('No video id found:')) throw err;
					searchSong(args.filter(x => x != '-f').join(' ')).then(url => 
						yt.getInfo(url, (err, info) => {
							if (err) {Subaru.log('err', err); Subaru.respond(message,'An error occured :v')}
							else Play(info);
						})
					).catch(msg => msg.edit('Ended song selection'));
				}
				else Play(info);
			});
			
			function Play(info) {
				if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(() => {
				
					if (message.content.includes('-f') || !Subaru.voice[message.guild.name].np){
						
						Subaru.playSong(Subaru, message.guild, {
							title: info.title,
							url: info.video_url,
							author: message.author.id,
							channel: message.channel.id,
							time: message.createdTimestamp
						});
						
					} else {
						if (Subaru.voice[message.guild.name].queue.filter(x => x.url == info.video_url)[0]) {
							Subaru.respond(message, 'That song is already in the queue!'); return;
						}
						
						Subaru.voice[message.guild.name].queue.push({
							title: info.title,
							url: info.video_url,
							author: message.author.id,
							channel: message.channel.id,
							time: message.createdTimestamp
						});
						Subaru.respond(message, `Added \`${info.title}\` to queue`);
					}
					
				}).catch(err => {Subaru.log('err',`trigger: ${message.content}\n ${err}`); Subaru.respond(message, 'An error occured :v')});
			}
			
			function searchSong(query){
				return new Promise(async(resolve, reject) => {
					let results = await request.get(`https://www.googleapis.com/youtube/v3/search?
					q=${query}&part=snippet&type=video&maxResults=10&key=${Subaru.config.youtubeSearchApi}&relevanceLanguage=en`);

					if (results.status != '200') {
						Subaru.log('warn', `Trigger: ${message.content}\n Non 200 status code`);
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
									let url = 'https://www.youtube.com/watch?v=' + items[index].id.videoId;
									list_msg.edit(`Selected song: \`${items[index].snippet.title}\``);
									collected_msg.delete();
									resolve(url);
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

