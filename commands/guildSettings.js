module.exports = {
	name: 'guildSettings',
	catagory: 'Moderation',
	description:'Show the guild settings of this server',
	usage:'guildSettings',
	
	run : async (Subaru, client, args, message) => {
		try {
			
			let guild = Subaru.GUILDS.get(message.guild.id);
			
			if (message.guild.channels.get(guild.greetingChannel)) var greetingChannel = `<#${message.guild.channels.get(guild.greetingChannel).id}>`;
			else var greetingChannel = 'none';
			
			if (message.guild.channels.get(guild.musicChannel)) var musicChannel = `<#${message.guild.channels.get(guild.musicChannel).id}>`;
			else var musicChannel = 'none';
			
			Subaru.respond(message, {embed:{
				title: `:gear: ${guild.name}`,
				description: guild.id,
				fields: [{
					name: 'Prefix:',
					value: guild.prefix != Subaru.config.prefix ? guild.prefix : 'default'
				},{
					name: 'Music channel:',
					value: musicChannel
				},{
					name: 'Greeting channel:',
					value: greetingChannel
				},{
					name: 'Greeting message:',
					value: guild.greeting ? guild.greeting : 'none'
				},{
					name: 'Farewell message:',
					value: guild.farewell ? guild.farewell : 'none'
				},{
					name: `Autoroles[${guild.autoroles ? guild.autoroles.length : '0'}]:`,
					value: guild.autoroles ? guild.autoroles.join(', ') : 'none'
				}],
				footer :{
					icon_url: message.guild.owner.user.avatarURL,
					text: `${message.guild.owner.displayName} | ${message.guild.name}`
				}
			}});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}