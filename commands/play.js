const yt = require('ytdl-core');
var youtube_node = require('youtube-node');
var yt_node = new youtube_node();

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
				if (!message.guild.voiceConnection) message.member.voiceChannel.join();
				
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
			}
			
			async function searchSong(query){
				return new Promise((resolve, reject) => {
					yt_node.setKey(Subaru.config.youtubeSearchApi);
					yt_node.search(query, 10, (err, result) => {
						if (err) throw err;
						if (!result.items[0]) {Subaru.respond(message, 'No results :v'); return;}
						let result_msg = 'Choose:\n';
						let i = 1;
						result.items.forEach(x => {result_msg += `\`${i}\` ` + x.snippet.title + '\n'; i++});
						result_msg += '**Cancel with `c`**';
						
							//Selector
							Subaru.respond(message, result_msg).then(list_msg => {
								var collector = 
									list_msg.channel.createMessageCollector(msg => msg.author == message.author, {time: 15	 * 1000});
								collector.on('collect', collected_msg => {
									if (collected_msg.content == 'c') collector.stop();
									let index = parseInt(collected_msg.content) - 1;
									if(result.items[index]){
										let url = 'https://www.youtube.com/watch?v=' + result.items[index].id.videoId;
										list_msg.edit(`Selected song: \`${result.items[index].snippet.title}\``);
										collected_msg.delete();
										resolve(url);
									} else collector.stop();
								});
								collector.on('end', () => reject(list_msg));
							});
							
						});
				});
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

