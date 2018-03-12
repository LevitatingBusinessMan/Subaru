module.exports = {
	name: 'setMusic',
	catagory: 'Moderation',
	description:'Every time the bot plays a new song it sends a message\n' + 
				'On default this message ends up in the chat where the song was requested\n' + 
				'Use this command to specify a channel for these messages',
	usage:'setMusic -set musicStuff',
	
	run : async (Subaru, client, args, message) => {
		try {
			//Check if author has perms
			let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
			if (!author[0].hasPermission('ADMINESTRATOR')) {Subaru.respond(message, "You don't have adminestrator permissions!"); return;}
			
			if (args[0] != '-set' && args[0] != '-remove') {
				let channelID = Subaru.GUILDS.get(message.guild.id).musicChannel;
				
				//Get channel name
				if (!message.guild.channels.has(channelID)) var channel = false;
				else var channel = message.guild.channels.get(channelID).name;
				
				Subaru.respond(message, (channel ? `Channel: \`${channel}\`.` : 'No channel has been set.') + 
				'\nPlease use the `-set` or `-remove` argument to change');
			}
			
			if (args[0] == '-set'){
				if (!args[1]) {Subaru.respond(message, 'Please specify a channel'); return}
				if (args[1].startsWith('<#')) var channel = message.guild.channels.get(args[1].between('<#', '>'));
				else var channel = message.guild.channels.find(x=> x.name == args[1]);
				if (!channel) Subaru.respond(message, 'That channel doesn\'t exist!');
				else {
					let guild = Subaru.GUILDS.get(message.guild.id);
					guild.musicChannel = channel.id;
					Subaru.GUILDS.set(guild.id, guild);
					Subaru.respond(message, `Channel \`${channel.name}\` has been set for music output`);
				}
			}
			
			if (args[0] == '-remove'){
				let guild = Subaru.GUILDS.get(message.guild.id);
				if (guild.musicChannel == false) {Subaru.respond(message, 'No music channel has been set!'); return;}
				guild.musicChannel = false;
				Subaru.GUILDS.set(guild.id, guild);
				Subaru.respond(message, 'Removed music channel');
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}